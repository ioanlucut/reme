angular
    .module("account")
    .controller("SignUpConfirmCtrl", function ($scope, $timeout, StatesHandler, User, AuthService, validateRegistrationResult) {

        /**
         * Validate registration result.
         */
        $scope.validateRegistrationResult = validateRegistrationResult;

        /**
         * Flag which tells if the sign up error occurred.
         * @type {boolean}
         */
        $scope.isSignUpErrorOcurred = false;

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
            timezone: ""
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
                        $scope.isSignUpErrorOcurred = false;

                        // Log in the user
                        AuthService
                            .login(signUpData.email, signUpData.password)
                            .then(function () {
                                StatesHandler.goToReminders();
                            });
                    })
                    .catch(function () {

                        $scope.isSignUpErrorOcurred = true;
                    });
            }

        };
    });
