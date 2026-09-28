// Runs the original 2015 Jasmine unit tests against the built scripts.
// `npm test` builds first (see the "pretest" script).

const { chromium } = require('@playwright/test');

process.env.CHROME_BIN = process.env.CHROME_BIN || chromium.executablePath();

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'dist/scripts/vendor.js',
      'dist/scripts/config.js',
      'dist/scripts/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app/**/*_test.js',
    ],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['dots'],
  });
};
