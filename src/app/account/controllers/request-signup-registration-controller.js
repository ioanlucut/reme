/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestSignUpRegistrationCtrl", function ($state, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration);

        /**
         * Flag which tells if the registration controller went well or not.
         * @type {boolean}
         */
        $scope.isRequestSignUpRegistrationErrorOcurred = false;

        /**
         * Request registration up user information.
         */
        $scope.requestSignUpRegistrationData = {
            email: ""
        };

        /**
         * Request registration functionality.
         */
        $scope.requestSignUpRegistration = function () {
            if ( $scope.requestSignUpRegistrationForm.$valid ) {
                AuthService
                    .requestSignUpRegistration($scope.requestSignUpRegistrationData.email)
                    .then(function () {
                        $scope.isRequestSignUpRegistrationErrorOcurred = false;
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent);
                    })
                    .catch(function () {
                        $scope.isRequestSignUpRegistrationErrorOcurred = true;
                    });
            }

        }
    });
