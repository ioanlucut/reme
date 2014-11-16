/* App module */

angular.module("app", [
        "ngAnimate",
        "ui.router",
        "partials",
        "site"
    ])
    .config(function($locationProvider) {

        // Enable html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })

    .run(function() {

        // Set the base API URL
        URLTo.apiBase("https://uat.reme.io/api");
    });