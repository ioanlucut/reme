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
        "feedback",
        "reminders",
        "account"
    ])
    .config(function ($locationProvider, flashProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Support bootstrap 3.0 "alert-danger" class with error flash types
        flashProvider.successClassnames.push('alert-reme');
        flashProvider.errorClassnames.push('alert-reme');
        flashProvider.infoClassnames.push('alert-reme');
        flashProvider.warnClassnames.push('alert-reme');
    })
    .run(function () {

        // Set the base API URL
        URLTo.apiBase("http://dev-api.reme.io");
    });