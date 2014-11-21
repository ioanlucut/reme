/**
 * Sign up controller responsible for user sign up action.
 */
angular
    .module("account")
    .controller("SignUpCtrl", function ($state, $scope, AuthService, AUTH_EVENTS, STATES) {

        /**
         * Sign up user information.
         * @type {{firstName: string, lastName: string, email: string, password: string}}
         */
        $scope.signUpData = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        /**
         * Sign up functionality.
         * @param signUpData
         */
        $scope.signUp = function (signUpData) {
            if ( $scope.signUpForm.$valid ) {
                AuthService.login(signUpData.email, signUpData.password)
                    .then(function () {
                        setTimeout(function () {
                            $state.go(STATES.home);
                        }, 300);
                    });
            }
            else {
                $scope.signUpForm.submitted = true;
            }

        }
    });
