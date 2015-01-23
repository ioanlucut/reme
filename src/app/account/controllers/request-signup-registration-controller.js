/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
    .module("account")
    .controller("RequestSignUpRegistrationCtrl", function ($scope, AuthService, ACCOUNT_FORM_STATE, AccountFormToggle, MIXPANEL_EVENTS) {

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
                    });
            }
        };
    });
