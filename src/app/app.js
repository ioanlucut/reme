/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "angular-flash.service",
        "angular-flash.flash-alert-directive",
        "ngStorage",
        "partials",
        "site",
        "common",
        "reminders",
        "account"
    ])
    .config(function ($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function ($window) {

        if ( $window.location.href.indexOf("dev.reme.io") > -1 || $window.location.href.indexOf("localhost") > -1 ) {
            URLTo.apiBase("http://api-dev.reme.io");
        }

        else if ( $window.location.href.indexOf("production.reme.io") > -1 ) {
            URLTo.apiBase("http://production-api.reme.io");
        }

        else {
            URLTo.apiBase("http://api.reme.io");
        }
    });