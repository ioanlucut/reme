/**
 * Logout controller responsible for user logout actions.
 */
angular
    .module("account")
    .controller("LogoutCtrl", function ($state, $scope, AuthService, $cookies, STATES) {

        /**
         * Logout functionality.
         */
        AuthService.logout()
            .then(function (message) {
                $scope.message = message;

                $state.go(STATES.home);
            })
            .catch(function (message) {
                $scope.message = message;
            });
    });
