/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", function ($scope, AuthService, AUTH_EVENTS, StatesHandler) {

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isAuthenticationErrorOcurred = false;

        /**
         * Login user information.
         * @type {{username: string, password: string}}
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * General messages which are to be shown during login process.
         * @type {string}
         */
        $scope.message = '';

        /**
         * Login functionality.
         * @param email
         * @param password
         */
        $scope.login = function (email, password) {

            AuthService.login(email, password)
                .then(function (response) {
                    $scope.message = response;

                    $scope.isAuthenticationErrorOcurred = false;

                    setTimeout(function () {
                        StatesHandler.goHome();
                    }, 300);
                })
                .catch(function (response) {
                    $scope.message = response;

                    $scope.isAuthenticationErrorOcurred = true;
                });
        }
    });
