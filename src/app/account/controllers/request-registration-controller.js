/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestRegistrationCtrl", function ($state, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestRegistration);

        /**
         * Flag which tells if the registration controller went well or not.
         * @type {boolean}
         */
        $scope.isRequestRegistrationErrorOcurred = false;

        /**
         * Request registration up user information.
         */
        $scope.requestRegistrationData = {
            email: ""
        };

        /**
         * Request registration functionality.
         */
        $scope.requestRegistration = function () {
            if ( $scope.requestRegistrationForm.$valid ) {
                AuthService
                    .requestRegistration($scope.requestRegistrationData.email)
                    .then(function () {
                        $scope.isRequestRegistrationErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestRegistrationEmailSent);
                    })
                    .catch(function () {
                        $scope.isRequestRegistrationErrorOcurred = true;
                    });
            }

        }
    });
