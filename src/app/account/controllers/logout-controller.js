/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("account")
    .controller("LogoutCtrl", function ($scope, AuthService, $cookies, StatesHandler) {

        /**
         * Logout functionality.
         */
        AuthService.logout()
            .then(function (message) {
                StatesHandler.goHome();
            });
    });
