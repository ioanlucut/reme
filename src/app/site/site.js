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
                title: "Create email reminders in seconds - Reme"
            })
            .state("privacy", {
                url: "/privacy",
                templateUrl: "app/site/partials/privacy.html",
                title: "Privacy - Reme"
            })
            .state("about", {
                url: "/about",
                templateUrl: "app/site/partials/about.html",
                title: "About - Reme"
            })
            .state("404", {
                url: "/404",
                templateUrl: "app/site/partials/404.html",
                controller: "Error404PageCtrl",
                title: "Hmm... looks like a 404"
            })
            .state("500", {
                url: "/500",
                templateUrl: "app/site/partials/500.html",
                controller: "Error500PageCtrl",
                title: "Oops... You found a 500"
            });
    });
