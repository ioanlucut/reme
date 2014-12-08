/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($q, $scope, $rootScope) {

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Error messages.
         * @type {string}
         */
        $scope.errorMessages = "";

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
                $scope.user.$save(profileData)

                    .then(function () {
                        $scope.user.$refresh().then(function () {
                            // Set form to pristine
                            $scope.profileForm.$setPristine();
                            $scope.errorMessages = "";

                            // Set for updated to true
                            $scope.profileForm.updated = true;
                        });
                    }).catch(function (response) {
                        $scope.errorMessages = response.data && response.data.errors && response.data.errors.email;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isProfileUpdated = true;
                    });
            }
            else {
                $scope.profileForm.submitted = true;
            }
        }
    });