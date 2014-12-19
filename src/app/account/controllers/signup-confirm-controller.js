angular
    .module("account")
    .controller("SignUpConfirmCtrl", function ($scope, StatesHandler, AccountFormToggle, $timeout, ACCOUNT_FORM_STATE, validateRegistration) {

        /**
         * Continues to login page.
         */
        $scope.continueToLogin = function () {
            $timeout(function () {
                AccountFormToggle.setState(ACCOUNT_FORM_STATE.login);
                StatesHandler.goToLogin();
            }, 400);
        }
    });
