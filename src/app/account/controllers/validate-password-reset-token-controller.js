angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", function ($scope, $stateParams, AuthService, StatesHandler, AccountFormToggle, ACCOUNT_FORM_STATE) {

        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        $scope.isResetPasswordErrorOcurred = false;

        $scope.errorMessages = "";

        $scope.resetPasswordData = {
            email: "",
            password: "",
            passwordConfirmation: "",
            token: $stateParams.token
        };

        $scope.isTokenResultValidated = AuthService.validatePasswordResetToken($scope.resetPasswordData.token)
            .then(function (response) {

                // Take the email from
                $scope.resetPasswordData.email = response.email;

                return true;
            }).catch(function (response) {

                $scope.errorMessages = response.data && response.data.errors;

                return false;
            });

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService.resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
                        $scope.isResetPasswordErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);
                    })
                    .catch(function (response) {
                        $scope.isResetPasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        // remove data from inputs
                        $scope.resetPasswordData.newPassword = "";
                        $scope.resetPasswordData.newPasswordConfirmation = "";
                    });
            }
            else {
                $scope.resetPasswordForm.submitted = true;
            }

        };

        $scope.continueToLogin = function () {
            StatesHandler.goToLogin();
        };

        $scope.continueToResetPassword = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            AccountFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
            $scope.continueToLogin();
        }
    });
