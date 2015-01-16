angular
    .module("account")
    .controller("SignUpConfirmCtrl", function ($scope, $timeout, flash, ALERTS_CONSTANTS, StatesHandler, User, AuthService, validateRegistrationResult, TimezoneProvider, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpConfirm;

        /**
         * Validate registration result.
         */
        $scope.validateRegistrationResult = validateRegistrationResult;

        /**
         * The given token
         * @type {.twitter.oauth.token|*|.yahoo.oauth.token|.dropbox.oauth.token|.flickr.oauth.token|token}
         */
        var token = $scope.validateRegistrationResult.token;

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            email: $scope.validateRegistrationResult.email,
            password: "",
            timezone: jstz.determine().name()
        };

        /**
         * Timezone details
         */
        $scope.timezoneDetails = TimezoneProvider.getTimezoneDescription($scope.signUpData.timezone);

        /*
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Compute timezone
                $scope.signUpData.timezone = jstz.determine().name();

                // Create a new user
                User.$new()
                    .$create(signUpData, token)
                    .then(function () {
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.signUpCompleted);

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToReminders();
                            });
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        $scope.badPostSubmitResponse = true;

                        flash.to($scope.alertIdentifierId).error = "Sorry, something went wrong.";
                    });
            }

        };
    });
