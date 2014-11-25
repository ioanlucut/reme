/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($scope, $rootScope, AuthService, StatesHandler, User) {

        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information.
         * @type {{firstName: string, lastName: string}}
         */
        $scope.profileData = {
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName
        };

        /**
         * Update profile functionality.
         * @param profileData
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                $scope.user.firstName = profileData.firstName;
                $scope.user.lastName = profileData.lastName;

                // Update the user
                $scope.user.$save()

                    .$then(function () {

                        // Save to the also to session
                        $scope.user.saveToSession();

                        // Set for updated to true
                        $scope.profileForm.updated = true;

                        // Set form to pristine
                        $scope.profileForm.$setPristine();
                    });
            }
            else {
                $scope.profileForm.submitted = true;
            }
        }
    });