angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", function ($scope, $timeout, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult) {

        /**
         * Flag which says if errors have ocured while trying to reset the password.
         * @type {boolean}
         */
        $scope.isResetPasswordErrorOcurred = false;

        /**
         * Error messages
         * @type {string}
         */
        $scope.errorMessages = "";

        /**
         * Reset password data (used if
         * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
         */
        $scope.resetPasswordData = {
            email: validateTokenResult.email,
            password: "",
            passwordConfirmation: "",
            token: validateTokenResult.token
        };

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService
                    .resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
                        $scope.isResetPasswordErrorOcurred = false;
                        $scope.successfullyReseted = true;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);

                        // Log in the user, and forward it to the reminders page.
                        AuthService
                            .login(resetPasswordData.email, resetPasswordData.password)
                            .then(function () {
                                $timeout(function () {
                                    StatesHandler.goToReminders();
                                }, 1500);
                            });
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
        };
    });
