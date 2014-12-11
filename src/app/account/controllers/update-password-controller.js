/**
 * Update password controller.
 */
angular
    .module("account")
    .controller("UpdatePasswordCtrl", function ($scope, AuthService, ACCOUNT_FORM_STATE, ProfileFormToggle) {

        /**
         * Flag which tells if the update password action went well or not.
         * @type {boolean}
         */
        $scope.isUpdatePasswordErrorOcurred = false;

        $scope.errorMessages = "";

        /**
         * Update password user information.
         * @type {{oldPassword: string, newPassword: string, newPasswordConfirmation: string}}
         */
        $scope.updatePasswordData = {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: ""
        };

        /**
         * Update password data functionality.
         * @param updatePasswordData
         */
        $scope.updatePassword = function (updatePasswordData) {
            if ( $scope.updatePasswordForm.$valid ) {

                AuthService
                    .updatePassword(updatePasswordData.oldPassword, updatePasswordData.newPassword, updatePasswordData.newPasswordConfirmation)
                    .then(function () {
                        $scope.isUpdatePasswordErrorOcurred = false;
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePasswordSuccessfully);
                    })
                    .catch(function (response) {
                        $scope.isUpdatePasswordErrorOcurred = true;

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        // remove data from inputs
                        $scope.updatePasswordData.oldPassword = "";
                        $scope.updatePasswordData.newPassword = "";
                        $scope.updatePasswordData.newPasswordConfirmation = "";
                    });
            }
        }
    });
