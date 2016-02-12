'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    errorHandler: function (title) {
        return function (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    wiredep: {
        directory: 'bower_components',
        overrides: {
            "jstz-detect": {
                "main": ["./jstz.js"]
            },
            "sugar-date": {
                "main": ["./date.sugar.js"]
            }
        },
        exclude: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'],
        fileTypes: {
            html: {
                replace: {
                    js: '<script src="/{{filePath}}"></script>'
                }
            }
        }
    }
};

wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
