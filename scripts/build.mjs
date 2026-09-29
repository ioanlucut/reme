// Builds the Reme front-end into dist/.
//
// Replaces the original 2015 gulp + bower + Ruby Sass pipeline with one
// dependency-free Node script and Dart Sass. The output is the same shape the
// gulp build produced: vendor scripts, the app scripts, the templates
// pre-loaded into $templateCache, one stylesheet and the static assets.
//
// Usage: node scripts/build.mjs [--base /reme/]
//   --base  the path the app is served from (default "/"), e.g. "/reme/" when
//           hosted under a sub-path.

import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

// The third-party scripts, in load order. These are the versions bower
// resolved in 2015-2016, or the nearest ones still published to npm.
export const VENDOR_SCRIPTS = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/lodash/index.js',
  'node_modules/underscore.string/lib/underscore.string.js',
  // Bootstrap's own jQuery plugins, for the data-toggle markup (the navbar).
  'node_modules/bootstrap-sass/vendor/assets/javascripts/bootstrap/transition.js',
  'node_modules/bootstrap-sass/vendor/assets/javascripts/bootstrap/collapse.js',
  'node_modules/bootstrap-sass/vendor/assets/javascripts/bootstrap/dropdown.js',
  'node_modules/chosen-js/chosen.jquery.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-chosen-localytics/dist/angular-chosen.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-sanitize/angular-sanitize.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
  'node_modules/angular-restmod/dist/angular-restmod-bundle.js',
  'node_modules/angular-intercom/angular-intercom.js',
  'node_modules/url-to/url-to.js',
  'node_modules/jstimezonedetect/jstz.js',
  'node_modules/humps/humps.js',
  'node_modules/perfect-scrollbar/src/perfect-scrollbar.js',
  'node_modules/sugar/release/sugar-full.development.js',
  'node_modules/moment/moment.js',
  'vendor/angular-flash/angular-flash.js',
  'node_modules/ngstorage/ngStorage.js',
  'node_modules/ladda/js/spin.js',
  'node_modules/ladda/js/ladda.js',
  'node_modules/angular-ladda/src/angular-ladda.js',
  'node_modules/angular-filter/dist/angular-filter.js',
];

// The backend-less demo: AngularJS's own ngMockE2E fakes the Reme API in the
// browser, so the app runs without a server.
export const DEMO_SCRIPTS = [
  'node_modules/angular-mocks/angular-mocks.js',
  'src/demo/demo.js',
  'src/demo/mock-api.js',
];

// The runtime configuration the gulp build generated from app.config.*.json.
export const CONFIG = {
  ENV: {
    name: 'demo',
    apiEndpoint: '/api',
    // Also silences the app's debug logging of the current user.
    isProduction: true,
  },
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return files.flat().sort();
};

const toPosix = (path) => path.split(sep).join('/');

const isTest = (file) => /(_test|\.spec|\.mock)\.js$/.test(file);

// AngularJS needs every `angular.module('x', [...])` declaration to run before
// the files that register on module 'x'. The gulp build used
// gulp-angular-filesort; loading the declaring files first is enough here.
export const appScripts = async () => {
  const files = (await walk(join(src, 'app'))).filter((file) => file.endsWith('.js') && !isTest(file));
  const declaresModule = await Promise.all(files.map(async (file) =>
    /angular\s*\.module\(\s*'[^']+'\s*,\s*\[/.test(await readFile(file, 'utf8'))));
  return [
    ...files.filter((_, i) => declaresModule[i]),
    ...files.filter((_, i) => !declaresModule[i]),
  ].map((file) => toPosix(relative(root, file)));
};

const concat = async (files) => {
  const parts = await Promise.all(files.map(async (file) =>
    `/* ${file} */\n${await readFile(join(root, file), 'utf8')}\n;`));
  return parts.join('\n');
};

// Same keys the gulp templatecache step produced: "/app/…" for the app's own
// templates and "template/…" for the angular-ui-bootstrap overrides.
const templateCache = async () => {
  const templates = [
    ...(await walk(join(src, 'app'))).filter((file) => file.endsWith('.html'))
      .map((file) => [`/${toPosix(relative(src, file))}`, file]),
    ...(await walk(join(src, 'template'))).map((file) => [toPosix(relative(src, file)), file]),
  ];
  const puts = await Promise.all(templates.map(async ([key, file]) =>
    `  $templateCache.put(${JSON.stringify(key)}, ${JSON.stringify(await readFile(file, 'utf8'))});`));
  return `angular.module('reme').run(['$templateCache', function ($templateCache) {\n${puts.join('\n')}\n}]);\n`;
};

const config = () =>
  `angular.module('config', []).constant('ENV', ${JSON.stringify(CONFIG.ENV, null, 2)});\n`;

const styles = () => sass.compile(join(src, 'sass', 'index.scss'), {
  loadPaths: [join(root, 'node_modules')],
  style: 'expanded',
  silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'color-functions', 'mixed-decls'],
  quietDeps: true,
  logger: sass.Logger.silent,
}).css;

const indexHtml = async (base) => {
  const scripts = ['scripts/vendor.js', 'scripts/config.js', 'scripts/app.js', 'scripts/templates.js', 'scripts/demo.js']
    .map((file) => `        <script src="${file}"></script>`).join('\n');
  return (await readFile(join(src, 'index.html'), 'utf8'))
    .replace('<!-- build:base -->', `<base href="${base}">`)
    .replace('<!-- build:css -->', '<link rel="stylesheet" href="styles/app.css">')
    .replace('<!-- build:js -->', scripts);
};

// Root-relative asset URLs resolve against <base href> once made relative.
const relativeAssets = (text) => text.replaceAll('"/assets/', '"assets/');

export const build = async ({ base = '/' } = {}) => {
  await rm(dist, { recursive: true, force: true });
  await mkdir(join(dist, 'scripts'), { recursive: true });
  await mkdir(join(dist, 'styles'), { recursive: true });

  const index = relativeAssets(await indexHtml(base));
  await Promise.all([
    cp(join(src, 'assets'), join(dist, 'assets'), { recursive: true }),
    writeFile(join(dist, 'index.html'), index),
    writeFile(join(dist, 'styles', 'app.css'), styles()),
    writeFile(join(dist, 'scripts', 'vendor.js'), await concat(VENDOR_SCRIPTS)),
    writeFile(join(dist, 'scripts', 'config.js'), config()),
    writeFile(join(dist, 'scripts', 'app.js'), await concat(await appScripts())),
    writeFile(join(dist, 'scripts', 'templates.js'), relativeAssets(await templateCache())),
    writeFile(join(dist, 'scripts', 'demo.js'), await concat(DEMO_SCRIPTS)),
  ]);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const baseIndex = process.argv.indexOf('--base');
  const base = baseIndex > -1 ? process.argv[baseIndex + 1] : '/';
  const started = Date.now();
  await build({ base });
  console.log(`Built dist/ for base ${base} in ${Date.now() - started} ms`);
}
