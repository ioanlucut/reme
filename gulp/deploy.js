'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
    }),
    cloudfront = require("gulp-cloudfront"),
    RevAll = require('gulp-rev-all'),
    revAll = new RevAll(),
    awspublish = require('gulp-awspublish'),
    _ = require('lodash'),
    argv = require('yargs').argv,
    environment,
    myConfig,
    publisher,
    headers,
    deployTask = function (environment) {
        myConfig = require('./app.config.' + environment + '.json');
        publisher = awspublish.create(myConfig.ENV.AWS);
        headers = {
            'Cache-Control': 'max-age=315360000, no-transform, public'
        };

        return gulp.src('dist/**')
            .pipe(revAll.revision())
            // gzip, Set Content-Encoding headers and add .gz extension
            .pipe(awspublish.gzip())
            // publisher will add Content-Length, Content-Type and headers specified above
            // If not specified it will set x-amz-acl to public-read by default
            .pipe(publisher.publish(headers))
            // create a cache file to speed up consecutive uploads
            //.pipe(publisher.sync())
            .pipe(publisher.cache())
            // print upload updates to console
            .pipe(awspublish.reporter())
            .pipe(cloudfront(_.extend({}, {
                "key": myConfig.ENV.AWS.accessKeyId,
                "secret": myConfig.ENV.AWS.secretAccessKey,
                "bucket": myConfig.ENV.AWS.params.Bucket,
                "region": myConfig.ENV.AWS.region,
                "distributionId": myConfig.ENV.AWS.distributionId
            })));
    };

module
    .exports = function () {
    gulp.task('deploy', function () {
        deployTask(argv.env || 'local-dev');
    });

    gulp.task('deploy:local', function () {
        deployTask(argv.env || 'localhost');
    });

    gulp.task('deploy:local-dev', function () {
        deployTask(argv.env || 'local-dev');
    });

    gulp.task('deploy:dev', function () {
        deployTask(argv.env || 'development');
    });

    gulp.task('deploy:dev-only', function () {
        deployTask(argv.env || 'development');
    });

    gulp.task('deploy:prod', function () {
        deployTask(argv.env || 'production');
    });
};
