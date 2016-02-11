'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');
var argv = require('yargs').argv;

module.exports = function (options) {
    gulp.task('inject', ['scripts', 'styles'], function () {
        var injectStyles = gulp.src([
            options.tmp + '/serve/app/**/*.css',
            '!' + options.tmp + '/serve/app/vendor.css'
        ], { read: false });

        // ---
        // This is the script transform which adds the async attribute to the script.
        // ---
        var scriptTransform = function (filepath, file, i, length) {
            return '<script src="' + filepath + '" defer></script>';
        };

        // ---
        // This is the styles transform which adds the async attribute to the script.
        // ---
        var styleTransform = function (filepath, file, i, length) {
            return '<link rel="stylesheet" href="' + filepath + '" async></script>';
        };

        var injectScripts,
            injectScriptsSrc = [
                options.src + '/app/**/*.js',
                options.src + '/vendor/**/*.js',
                '!' + options.src + '/app/**/*.spec.js',
                '!' + options.src + '/app/**/*test.js',
                '!' + options.src + '/app/**/*.mock.js'
            ];

        injectScripts = gulp
            .src(injectScriptsSrc)
            .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

        var injectOptions = {
            ignorePath: [options.src, options.tmp + '/serve'],
            addRootSlash: true
        };

        return gulp.src(options.src + '/*.html')
            .pipe($.inject(injectStyles, _.extend({ transform: styleTransform }, injectOptions)))
            .pipe($.inject(injectScripts, _.extend({ transform: scriptTransform }, injectOptions)))
            .pipe(wiredep(_.extend({}, options.wiredep)))
            .pipe(gulp.dest(options.tmp + '/serve'));

    });
};
