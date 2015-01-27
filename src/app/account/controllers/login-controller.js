/**
 * Login controller responsible for user login actions.
 */
angular
    .module("account")
    .controller("LoginCtrl", function ($scope, flash, ALERTS_CONSTANTS, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle, StatesHandler, $timeout) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.login;

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.login);

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

                // Show the loading bar
                $scope.isRequestPending = true;

                AuthService
                    .login(loginData.email, loginData.password)
                    .then(function () {

                        StatesHandler.goToReminders();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Your email or password are wrong. Please try again.";
                    }).finally(function () {
                        // Stop the loading bar
                        $timeout(function () {
                            $scope.isRequestPending = false;
                        }, 2000);
                    })
            }
        };
    });
