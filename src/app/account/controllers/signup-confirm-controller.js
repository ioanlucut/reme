angular
    .module("account")
    .controller("SignUpConfirmCtrl", function ($scope, $timeout, flash, jstz, StatesHandler, User, AuthService, validateRegistrationResult) {

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
                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToReminders();
                            });
                    })
                    .catch(function () {
                        $scope.signUpForm.$invalid = true;

                        flash.error = "Sorry, something went wrong.";
                    });
            }

        };
    });
