/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($q, $scope, $rootScope, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE) {

        /**
         * Set default state.
         */
        ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);

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
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            email: $scope.user.model.email,
            timezone: $scope.user.model.timezone
        };

        /**
         * Update profile functionality.
         */
        $scope.updateProfile = function (profileData) {

            if ( $scope.profileForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(profileData)
                    .then(function () {
                        $scope.user.$refresh().then(function () {
                            // Set form to pristine
                            $scope.profileForm.$setPristine();
                            $scope.errorMessages = "";

                            // Set for updated to true
                            $scope.isProfileUpdated = true;
                        });
                    })
                    .catch(function (response) {
                        $scope.errorMessages = response.data && response.data.errors && response.data.errors.email;

                        if ( _.isEmpty($scope.errorMessages) ) {
                            $scope.errorMessages = ["We encountered a small problem. Please be patient, we come back to you."]
                        }

                        $scope.isProfileUpdated = false;
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToReminders();
        }
    });