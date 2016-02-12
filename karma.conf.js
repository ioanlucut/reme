'use strict';

module.exports = function (config) {

    var configuration = {

        autoWatch: false,

        colors: true,

        frameworks: ['browserify', 'jasmine'],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src',
            moduleName: 'gulpAngular'
        },

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-browserify',
            'karma-ng-html2js-preprocessor'
        ],

        preprocessors: {
            'src/**/*_test.js': ['browserify'],
            'tests/**/*.js': ['browserify'],
            'src/**/*.html': ['ng-html2js']
        },

        browserify: {
            debug: true,
            paths: ['./node_modules', './src']
        }
    };

    config.set(configuration);
};
