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
    })
    .run(function () {

        // Set the base API URL
        URLTo.apiBase("http://dev-api.reme.io");
    });