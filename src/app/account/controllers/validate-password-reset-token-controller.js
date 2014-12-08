angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", function ($scope, $stateParams, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

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
         * If validation is successful, then fetch the email, and build form data.
         */
        if ( validateTokenResult.successful ) {

            /**
             * Reset password data (used if
             * @type {{email: string, password: string, passwordConfirmation: string, token: *}}
             */
            $scope.resetPasswordData = {
                email: validateTokenResult.email,
                password: "",
                passwordConfirmation: "",
                token: $stateParams.token
            };

            $scope.isTokenValid = true;
        }
        else {
            $scope.errorMessages = validateTokenResult.errors;
        }

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService.resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.passwordConfirmation, resetPasswordData.token)
                    .then(function () {
                        $scope.isResetPasswordErrorOcurred = false;
                        $scope.successfullyReseted = true;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);
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

        /**
         * Continues to login page.
         */
        $scope.continueToLogin = function () {
            StatesHandler.goToLogin();
        };

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.continueToResetPassword = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            ProfileFormToggle.setState(ACCOUNT_FORM_STATE.forgotPassword);
            $scope.continueToLogin();
        }
    });
