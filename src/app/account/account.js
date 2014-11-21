/**
 * Main account module declaration including ui templates.
 */
angular
    .module("account", ["ui.router", "restmod"])
    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Login page
            .state("account:login", {
                url: "/account/login",
                templateUrl: "app/account/partials/account.html",
                controller: "LoginCtrl",
                title: "Login",
                resolve: {
                    helloMessage: function () {
                        return {
                            message: 'I am in login page!'
                        };
                    }
                }
            })

            // Logout page
            .state("account:logout", {
                url: "/account/logout",
                controller: "LogoutCtrl"
            })
    })
    .run(function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    });