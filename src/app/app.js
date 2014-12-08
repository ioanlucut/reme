/**
 * Main app module declaration.
 */
angular
    .module("app", [
        "ngAnimate",
        "ui.router",
        "ngCookies",
        "partials",
        "site",
        "common",
        "feedback",
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
        URLTo.apiBase("http://beta-api.reme.io");
    });