angular
    .module("account")
    .controller("SignUpConfirmInvalidCtrl", function ($scope, AuthService, StatesHandler) {

        /**
         * Flag which tells if user is currently authenticated while coming to this page.
         */
        $scope.isUserAuthenticated = AuthService.isAuthenticated();

        /**
         * Continues to reset password page. (try again functionality)
         */
        $scope.goHome = function () {
            if ( $scope.isUserAuthenticated ) {
                AuthService.logout();
            }
            StatesHandler.goHome();
        };
    });
