/**
 * Sign up controller responsible for user sign up action.
 */
angular
    .module("account")
    .controller("SignUpCtrl", function ($scope, AuthService, StatesHandler, User, $timeout, jstz) {

        /**
         * Flag which tells if the sign up error occurred.
         * @type {boolean}
         */
        $scope.isSignUpErrorOcurred = false;

        /**
         * Flag which tells if the sign up action went well.
         * @type {boolean}
         */
        $scope.isSignedUp = false;

        /**
         * Error messages.
         * @type {string}
         */
        $scope.errorMessages = "";

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            timezone: ""
        };

        /**
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {

                // Compute timezone
                $scope.signUpData.timezone = jstz.determine().name();

                // Create a new user
                User.$new().$create(signUpData)
                    .then(function () {
                        $scope.isSignUpErrorOcurred = false;

                        // Log in the user
                        AuthService.login(signUpData.email, signUpData.password).then(function () {
                            $scope.isSignedUp = true;
                            $timeout(function () {
                                StatesHandler.goToReminders();
                            }, 2500);
                        });
                    }).catch(function (response) {

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isSignUpErrorOcurred = true;
                    });
            }
            else {
                $scope.signUpForm.submitted = true;
            }

        }
    });
