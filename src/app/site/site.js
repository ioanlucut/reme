/* Site module */

angular.module("site", ["ngAnimate", "ui.router", "ui.bootstrap.bindHtml", "account"])

    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("home", {
                url: "/",
                templateUrl: "app/site/partials/home.html",
                controller: "HomeCtrl",
                title: "home",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'Hello!'
                        };
                    }
                }
            })
    });
