/**
 * Forgot password controller responsible for user forgot password action.
 */
angular
    .module("account")
    .controller("ForgotPasswordCtrl", function ($state, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

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
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPasswordEmailSent);
                    });
            }
            else {
                $scope.forgotPasswordForm.submitted = true;
            }

        }
    });
