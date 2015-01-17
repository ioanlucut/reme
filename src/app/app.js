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
    .run(function () {

        // Set the base API URL
        URLTo.apiBase("http://api.reme.io");
    });