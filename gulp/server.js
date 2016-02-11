'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var middleware = require('./proxy');

module.exports = function (options) {

    function browserSyncInit(baseDir, browser) {
        browser = browser === undefined ? 'default' : browser;

        var routes = null;
        if (baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
            routes = {
                '/bower_components': 'bower_components'
            };
        }

        var server = {
            baseDir: baseDir,
            routes: routes
        };

        if (middleware.length > 0) {
            server.middleware = middleware;
        }

        browserSync.instance = browserSync.init({
            startPath: '/',
            server: server,
            browser: browser,
            open: false,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        });
    }

    browserSync.use(browserSyncSpa({
        selector: '[ng-app]'// Only needed for angular apps
    }));

    gulp.task('serve', ['config', 'watch'], function () {
        browserSyncInit([options.tmp + '/serve', options.src]);
    });

    gulp.task('serve:dist', ['config', 'build'], function () {
        browserSyncInit(options.dist);
    });

    // ---
    // Doesn't require config and inject.
    // Assumes no one has changed the angular app.
    // Is faster.
    // ---
    gulp.task('serve:e2e-quick', [], function () {
        browserSyncInit([options.tmp + '/serve', options.src], []);
    });

    gulp.task('serve:e2e', ['config', 'inject'], function () {
        browserSyncInit([options.tmp + '/serve', options.src], []);
    });

    gulp.task('serve:e2e-dist', ['config', 'build'], function () {
        browserSyncInit(options.dist, []);
    });
};
