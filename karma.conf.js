module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            "bower_components/jquery/dist/jquery.js",
            "bower_components/lodash/dist/lodash.js",
            "bower_components/underscore.string/dist/underscore.string.min.js",
            "bower_components/cookies-js/src/cookies.js",
            "bower_components/mousetrap/mousetrap.js",
            "bower_components/uploader/uploader.js",
            "bower_components/moment/moment.js",
            "bower_components/url-to/url-to.js",
            "bower_components/hello/dist/hello.all.js",
            "bower_components/hello/src/modules/facebook.js",
            "bower_components/hello/src/modules/google.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/angular-i18n/angular-locale_ro.js",
            "bower_components/angular-ui-router/release/angular-ui-router.js",
            "bower_components/angular-inflector/dist/angular-inflector.js",
            "bower_components/angular-restmod/dist/angular-restmod-bundle.js",
            "bower_components/angular-cookies/angular-cookies.js",
            "bower_components/angular-messages/angular-messages.js",
            "bower_components/angular-flash/dist/angular-flash.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml.js",
            "bower_components/jstz-detect/jstz.js",
            "bower_components/humps/humps.js",
            "bower_components/perfect-scrollbar/src/perfect-scrollbar.js",
            "bower_components/perfect-scrollbar/src/jquery.mousewheel.js",
            "bower_components/sugar-date/date.sugar.js",
            "bower_components/angular-ui-bootstrap/src/position/position.js",
            "bower_components/angular-ui-bootstrap/src/transition/transition.js",
            "bower_components/angular-ui-bootstrap/src/bindHtml/bindHtml.js",
            "bower_components/angular-ui-bootstrap/src/dropdown/dropdown.js",
            "bower_components/angular-ui-bootstrap/src/modal/modal.js",
            "bower_components/angular-ui-bootstrap/src/tabs/tabs.js",
            "bower_components/ngstorage/ngStorage.js",
            "bower_components/ladda/js/spin.js",
            "bower_components/ladda/js/ladda.js",
            "bower_components/angular-ladda/src/angular-ladda.js",
            "bower_components/chosen/chosen.jquery.js",
            "bower_components/angular-chosen-localytics/chosen.js",
            "src/app/common/common.js",
            "src/app/common/**/*.js",
            "src/app/account/account.js",
            "src/app/account/**/*.js",
            "src/app/site/site.js",
            "src/app/site/**/*.js",
            "src/app/reminders/reminders.js",
            "src/app/reminders/**/*.js",
            "src/app/feedback/feedback.js",
            "src/app/feedback/**/*.js",
            "src/app/app.js",
            "src/app/app.ctrl.js",
            "build/partials/partials.js",
            "src/**/*_test.js"
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
