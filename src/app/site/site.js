/**
 * Main site module declaration including ui templates.
 */
angular
    .module("site", [
        "ngAnimate",
        "ui.router",
        "ui.bootstrap.bindHtml",
        "account"
    ])
    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/home",
                templateUrl: "app/site/partials/home.html",
                controller: "HomeCtrl",
                title: "Home",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'I am home!'
                        };
                    }
                }
            })
    });
