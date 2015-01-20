/**
 * Update password controller.
 */
angular
    .module("account")
    .controller("UpdatePasswordCtrl", function ($scope, flash, AuthService, ACCOUNT_FORM_STATE, ALERTS_CONSTANTS, ProfileFormToggle) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updatePassword;

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
                        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updatePasswordSuccessfully);
                    })
                    .catch(function (response) {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = response.data && response.data.errors && response.data.errors[0];
                    });
            }
        };
    });