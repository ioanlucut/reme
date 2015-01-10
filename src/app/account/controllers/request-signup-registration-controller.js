/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestSignUpRegistrationCtrl", function ($state, flash, ALERTS_CONSTANTS, $scope, AuthService, AUTH_EVENTS, ACCOUNT_FORM_STATE, AccountFormToggle, $timeout, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.requestSignUpRegistration;

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
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpRequested);

                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent);
                    })
                    .catch(function () {
                        $scope.requestSignUpRegistrationForm.email.$invalid = true;

                        flash.to($scope.alertIdentifierId).error = "We encountered a problem.";
                    });
            }
        }
    });
