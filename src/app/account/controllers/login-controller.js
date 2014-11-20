/**
 * Login controller responsible for user login actions.
 * Created by ilucut on 11/15/14.
 */
angular.module("account").controller("LoginCtrl", function ($state, $scope, LoginService, AUTH_EVENTS, STATES) {

    /**
     * Flag which tells if the authentication went well or not.
     * @type {boolean}
     */
    $scope.isAuthenticationErrorOcurred = false;

    /**
     * Login user information.
     * @type {{username: string, password: string}}
     */
    $scope.user = {
        username: '',
        password: ''
    };

    /**
     * General messages which are to be shown during login process.
     * @type {string}
     */
    $scope.message = '';

    /**
     * Login functionality.
     * @param name
     * @param password
     * @param loginForm
     */
    $scope.login = function (name, password, loginForm) {

        if (loginForm.$invalid) {
            if (loginForm.userName.$pristine) {
                loginForm.userName.$invalid = true;
                loginForm.userName.$pristine = false;
            }
            if (loginForm.userPassword.$pristine) {
                loginForm.userPassword.$invalid = true;
                loginForm.userPassword.$pristine = false;
            }
        }
        else {

            LoginService.login(name, password)
                .then(function (response) {
                    $scope.message = response;

                    $scope.isAuthenticationErrorOcurred = false;

                    setTimeout(function () {
                        $state.go(STATES.home);
                    }, 300);
                })
                .catch(function (response) {
                    $scope.message = response;

                    $scope.isAuthenticationErrorOcurred = true;
                });
        }
    }
});
