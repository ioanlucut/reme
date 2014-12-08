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
                templateUrl: "app/account/partials/account.html"
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
                controller: "LogoutCtrl",
                templateUrl: "app/account/partials/logout.html",
                resolve: {
                    isSuccessfullyLoggedOut: function ($q, AuthService) {
                        AuthService.logout();

                        return true;
                    }
                }

            })

            // Validate password reset token
            .state({
                name: "account:validatePasswordResetToken",
                url: "/account/reset-password/{token}",
                templateUrl: "app/account/partials/validate_password_reset_token.html",
                controller: "ValidatePasswordResetTokenCtrl",
                resolve: {
                    validateTokenResult: function ($stateParams, $q, AuthService) {
                        var deferred = $q.defer();

                        AuthService.validatePasswordResetToken($stateParams.token)
                            .then(function (response) {

                                // Take the email from
                                deferred.resolve({successful: true, email: response.email});

                                return response;
                            }).catch(function (response) {

                                deferred.resolve({successful: false, errors: response.data && response.data.errors});

                                return response;
                            });

                        return deferred.promise;
                    }
                }
            })
    })

    .run(function ($rootScope, AuthFilter) {

        // Setup route filters
        $rootScope.$on("$stateChangeStart", AuthFilter);

    });