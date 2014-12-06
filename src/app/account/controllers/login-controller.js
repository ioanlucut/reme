/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", function ($scope, AuthService, AUTH_EVENTS, StatesHandler, $timeout) {

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isAuthenticationErrorOcurred = false;
        $scope.loggedIn = false;

        /**
         * Login user information.
         * @type {{username: string, password: string}}
         */
        $scope.loginData = {
            email: "",
            password: ""
        };

        /**
         * Login functionality.
         * @param loginData
         */
        $scope.login = function (loginData) {
            if ( $scope.loginForm.$valid ) {

                AuthService.login(loginData.email, loginData.password)
                    .then(function () {
                        $scope.isAuthenticationErrorOcurred = false;
                        $scope.loggedIn = true;
                        $timeout(function () {
                            StatesHandler.goHome();
                        }, 1000);
                    })
                    .catch(function () {

                        $scope.isAuthenticationErrorOcurred = true;
                    });
            }
            else {
                $scope.loginForm.submitted = true;
            }

        }
    });
