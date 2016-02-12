'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var environment = argv.env || 'local-dev';

module.exports = function (options) {
    gulp.task('partials', function () {
        return gulp.src([
            options.src + '/**/*.html',
            options.tmp + '/serve/app/**/*.html'
        ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtml.js', {
                module: 'reme',
                root: '/app'
            }))
            .pipe($.replace('/app/template', 'template'))
            .pipe($.replace('/app/app/', '/app/'))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });

    gulp.task('html', ['inject', 'partials'], function () {
        var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', { read: false });
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };

        var htmlFilter = $.filter('*.html');
        var jsFilter = $.filter('**/*.js');
        var cssFilter = $.filter('**/*.css');
        var assets;

        return gulp.src(options.tmp + '/serve/*.html')
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.ngAnnotate())
            .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe($.csso())
            .pipe($.replace('../../bower_components/font-awesome/fonts', '../fonts'))
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.dist + '/'))
            .pipe($.size({ title: options.dist + '/', showFiles: true }));
    });

    // Only applies for fonts from bower dependencies
    // Custom fonts are handled by the "other" task
    gulp.task('fonts', function () {
        return gulp.src($.mainBowerFiles())
            .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe($.flatten())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('other', function () {
        return gulp.src([
            options.src + '/**/*',
            '!' + options.src + '/**/*.{html,css,js,scss}'
        ])
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(options.dist + '/'));
    });

    gulp.task('clean', function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });

    gulp.task('build', ['clean'], function () {
        gulp.start(['html', 'fonts', 'config', 'other']);
    });

    gulp.task('build:local', ['clean'], function () {
        environment = argv.env || 'local';
        gulp.start(['html', 'fonts', 'config:local', 'other']);
    });

    gulp.task('build:dev', ['clean'], function () {
        environment = argv.env || 'development';
        gulp.start(['html', 'fonts', 'config:dev', 'other']);
    });

    gulp.task('build:prod', ['clean'], function () {
        environment = argv.env || 'production';
        gulp.start(['html', 'fonts', 'config:prod', 'other']);
    });
};
