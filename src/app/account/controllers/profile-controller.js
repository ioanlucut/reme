/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($scope, $rootScope, AuthService, StatesHandler, User, AccountFormToggle, ACCOUNT_FORM_STATE) {

        $scope.user = $rootScope.currentUser;

        // Default state
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);

        /**
         * Profile user information.
         * @type {{firstName: string, lastName: string}}
         */
        $scope.profileData = {
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            email: $scope.user.email,
            timezone: $scope.user.timezone
        };

        /**
         * Update profile functionality.
         * @param profileData
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                // Update the user
                $scope.user.$save()

                    .then(function () {

                        // Save to the also to session
                        $scope.user.saveToSession();

                        // Set for updated to true
                        $scope.profileForm.updated = true;

                        // Set form to pristine
                        $scope.profileForm.$setPristine();

                        $scope.user.firstName = profileData.firstName;
                        $scope.user.lastName = profileData.lastName;
                        $scope.user.email = profileData.email;
                    });
            }
            else {
                $scope.profileForm.submitted = true;
            }
        }
    });