/**
 * Sign up controller responsible for user sign up action.
 */
angular
    .module("account")
    .controller("SignUpCtrl", function ($scope, AuthService, StatesHandler, User) {

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
                User.$create(signUpData)
                    .$then(function () {

                        // Log in the user
                        AuthService.login(signUpData.email, signUpData.password);

                        // Go home
                        StatesHandler.goHome();
                    });
            }
            else {
                $scope.signUpForm.submitted = true;
            }

        }
    });
