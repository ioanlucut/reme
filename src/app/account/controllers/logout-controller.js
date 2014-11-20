/**
 * Logout controller responsible for user logout actions.
 * Created by ilucut on 11/15/14.
 */
angular.module("account").controller("LogoutCtrl", function ($state, $scope, LoginService, $cookies, STATES) {

    /**
     * Logout functionality.
     */
    LoginService.logout()
        .then(function (message) {
            $scope.message = message;

            $state.go(STATES.home);
        })
        .catch(function (message) {
            $scope.message = message;
        });
});
