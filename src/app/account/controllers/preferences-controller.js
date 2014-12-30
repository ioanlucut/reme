/**
 * Profile controller responsible for user update profile action.
 */
angular
    .module("account")
    .controller("PreferencesCtrl", function ($q, $scope, $rootScope, flash) {

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.preferencesData = {
            firstName: $scope.user.model.firstName,
            lastName: $scope.user.model.lastName,
            email: $scope.user.model.email,
            timezone: $scope.user.model.timezone
        };

        /**
         * Update profile functionality.
         */
        $scope.updatePreferences = function (preferencesData) {

            if ( $scope.preferencesForm.$valid ) {

                // Update the user
                $scope.user
                    .$save(preferencesData)
                    .then(function () {
                        $scope.user.$refresh().then(function () {
                            $scope.preferencesForm.$setPristine();

                            flash.success = 'We\'ve successfully updated your account!';
                        });
                    })
                    .catch(function () {

                        flash.error = 'We\'ve encountered an error while trying to update your account.';
                    });
            }
        };
    });