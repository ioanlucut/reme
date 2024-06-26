'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');

var wiredep = require('wiredep');
var karma = require('karma');
var concat = require('concat-stream');
var _ = require('lodash');

module.exports = function (options) {
  function listFiles(callback) {
    var wiredepOptions = _.extend({}, options.wiredep, {
      dependencies: true,
      devDependencies: true,
    });
    var bowerDeps = wiredep(wiredepOptions);

    var specFiles = [
      options.src + '/**/*.spec.js',
      options.src + '/**/*test.js',
      options.src + '/**/*.mock.js',
    ];

    var htmlFiles = [
      options.src + '/**/*.html',
    ];

    var srcFiles = [
      options.src + '/app/**/*.js',
    ].concat(specFiles.map(function (file) {
      return '!' + file;
    }));

    gulp.src(srcFiles)
      .pipe(concat(function (files) {
        callback(bowerDeps.js
          .concat(_.pluck(files, 'path'))
          .concat(htmlFiles)
          .concat(specFiles));
      }));
  }

  function runTests(singleRun, done) {
    listFiles(function (files) {
      karma.server.start({
        configFile: __dirname + '/../karma.conf.js',
        files: files,
        singleRun: singleRun,
        autoWatch: !singleRun,
      }, function (exitCode) {
        done();
        gutil.log(gutil.colors.green('Karma has exited with [' + exitCode + ']'));
        process.exit(exitCode);
      });
    });
  }

  gulp.task('test', ['config', 'scripts'], function (done) {
    runTests(true, done);
  });

  gulp.task('test:auto', ['config', 'watch'], function (done) {
    runTests(false, done);
  });
};
