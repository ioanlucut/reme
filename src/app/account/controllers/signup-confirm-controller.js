angular
    .module("account")
    .controller("SignUpConfirmCtrl", function ($scope, StatesHandler, AccountFormToggle, $timeout, ACCOUNT_FORM_STATE, validateRegistrationResult) {

        $scope.validateRegistrationResult = validateRegistrationResult;

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.signUp);

        /**
         * Flag which tells if the sign up error occurred.
         * @type {boolean}
         */
        $scope.isSignUpErrorOcurred = false;

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
            email: "test",
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
                User.$new()
                    .$create(signUpData)
                    .then(function () {
                        $scope.isSignUpErrorOcurred = false;

                        AccountFormToggle.setState(ACCOUNT_FORM_STATE.signUpSuccessfully);
                        $timeout(function () {
                            StatesHandler.goToLogin();
                        }, 2000)

                    })
                    .catch(function (response) {

                        $scope.errorMessages = response.data && response.data.errors;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isSignUpErrorOcurred = true;
                    });
            }

        };

        /**
         * Continues to login page.
         */
        $scope.continueToLogin = function () {
            $timeout(function () {
                AccountFormToggle.setState(ACCOUNT_FORM_STATE.login);
                StatesHandler.goToLogin();
            }, 400);
        }
    });
