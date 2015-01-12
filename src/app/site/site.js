/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "common"
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        // Otherwise
        $urlRouterProvider.otherwise('/404');

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "LandingPageCtrl",
                title: "Home - Reme.io"
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageCtrl",
                title: "Not found - Reme.io"
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageCtrl",
                title: "Error - Reme.io"
            })
    });
