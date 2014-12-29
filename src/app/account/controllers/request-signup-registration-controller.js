/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestSignUpRegistrationCtrl", function ($state, flash, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle) {

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration);

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
                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent);
                    })
                    .catch(function () {
                        $scope.requestSignUpRegistrationForm.email.$invalid = true;

                        flash.error = "We encountered a problem.";
                    });
            }
        }
    });
