/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("account")
    .controller("ForgotPasswordCtrl", function ($state, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isRequestPasswordErrorOcurred = false;

        $scope.errorMessages = "";

        /**
         * Request password reset up user information.
         */
        $scope.forgotPasswordData = {
            email: ""
        };

        /**
         * Request password reset functionality.
         */
        $scope.requestPasswordReset = function () {
            if ( $scope.forgotPasswordForm.$valid ) {
                AuthService.requestPasswordReset($scope.forgotPasswordData.email)
                    .then(function () {
                        $scope.isRequestPasswordErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    }).catch(function (response) {
                        $scope.isRequestPasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;
                    });
            }
            else {
                $scope.forgotPasswordForm.submitted = true;
            }

        }
    });
