/**
 * Main account module declaration including ui templates.
 */
angular
    .module("account", ["ui.router", "restmod"])
    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Login page
            .state("account", {
                url: "/account",
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

            // Profile page
            .state("profile", {
                url: "/profile",
                templateUrl: "app/account/partials/profile.html",
                controller: "ProfileCtrl",
                title: "Profile",
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