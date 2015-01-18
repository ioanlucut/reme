/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("ProfileCtrl", function ($q, $scope, $rootScope, StatesHandler, ProfileFormToggle, ACCOUNT_FORM_STATE, flash, ALERTS_CONSTANTS, MIXPANEL_EVENTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.updateProfile;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.settings);

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
         * Profile user information
         */
        $scope.profileData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
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
                            $scope.profileForm.$setPristine();

                            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your account!';
                        });
                    })
                    .catch(function () {

                        flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };

        $scope.getMeBack = function () {
            StatesHandler.goToReminders();
        };
    });