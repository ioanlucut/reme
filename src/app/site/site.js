/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "ngAnimate",
        "ui.router"
    ])
    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "HomeCtrl",
                title: "Home - Reme.io"
            })
    });
