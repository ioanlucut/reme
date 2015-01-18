angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", function ($scope, $timeout, flash, AuthService, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, validateTokenResult, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.validatePassword;

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
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }
        };

    });
