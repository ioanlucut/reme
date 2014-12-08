/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($q, $scope, $rootScope) {

        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName,
            email: $scope.user.email,
            timezone: $scope.user.timezone
        };

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                // Update the user
                $q.all($scope.user.$save(profileData))
                    .then($scope.user.$refresh())
                    .then(function () {
                        // Set for updated to true
                        $scope.profileForm.updated = true;

                        // Set form to pristine
                        $scope.profileForm.$setPristine();
                    })
                    .catch(function (error) {

                    });
            }
            else {
                $scope.profileForm.submitted = true;
            }
        }
    });