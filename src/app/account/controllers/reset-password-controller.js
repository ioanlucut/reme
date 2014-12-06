/**
 * Reset password controller.
 */
angular
    .module("account")
    .controller("ResetPasswordCtrl", function ($scope, $rootScope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, StatesHandler, AccountFormToggle) {

        $scope.user = $rootScope.currentUser;

        /**
         * Flag which tells if the authentication went well or not.
         * @type {boolean}
         */
        $scope.isResetPasswordErrorOcurred = false;

        $scope.errorMessages = "";

        /**
         * Reset password user information.
         * @type {{firstName: string, lastName: string}}
         */
        $scope.resetPasswordData = {
            email: $scope.user.email,
            password: "",
            confirmPassword: ""
        };

        /**
         * Reset password data functionality.
         * @param resetPasswordData
         */
        $scope.resetPassword = function (resetPasswordData) {
            if ( $scope.resetPasswordForm.$valid ) {

                AuthService.resetPasswordWithToken(resetPasswordData.email, resetPasswordData.password, resetPasswordData.confirmPassword)
                    .then(function () {
                        $scope.isResetPasswordErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.resetPasswordSuccessfully);
                    })
                    .catch(function (response) {
                        $scope.isResetPasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;
                    });
            }
            else {
                $scope.resetPasswordForm.submitted = true;
            }

        }
    });
