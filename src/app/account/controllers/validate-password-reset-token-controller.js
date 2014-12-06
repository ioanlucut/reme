angular
    .module("account")
    .controller("ValidatePasswordResetTokenCtrl", function ($scope, $stateParams, AuthService, StatesHandler, AccountFormToggle, ACCOUNT_FORM_STATE) {

        $scope.isFeedbackToBeShown = false;
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        $scope.validateTokenResult = AuthService.validatePasswordResetToken($stateParams.token)
            .catch(function (response) {

                $scope.errorMessages = response.data && response.data.errors;
            }).finally(function () {
                $scope.isFeedbackToBeShown = true;
            });

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
