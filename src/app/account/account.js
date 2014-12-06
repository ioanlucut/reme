/**
 * Main account module declaration including ui templates.
 */
angular
    .module("account", [
        "ui.router",
        "restmod",
        "common"
    ])
    .config(function ($stateProvider, $httpProvider) {

        // Register AuthInterceptor
        $httpProvider.interceptors.push("AuthInterceptor");

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

            // Validate password reset token
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/validatePasswordResetToken/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token.html"
            })
    })

    .run(function ($rootScope, AuthFilter, ResetPasswordFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);
        $rootScope.$on("$stateChangeStart", ResetPasswordFilter);

    });