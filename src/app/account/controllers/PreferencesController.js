/**
 * Preferences controller responsible for user update preferences action.
 */
angular
  .module('remeAccount')
  .controller('PreferencesCtrl', function ($q, $scope, $rootScope, TimezoneProvider, flash, ALERTS_CONSTANTS) {

    /**
     * Alert identifier
     */
    $scope.alertIdentifierId = ALERTS_CONSTANTS.preferences;

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
      timezone: $scope.user.model.timezone,
    };

    /**
     * Available timezones.
     */
    $scope.timezones = TimezoneProvider.getTimezones();

    /**
     * Update preferences functionality.
     */
    $scope.updatePreferences = function (preferencesData) {

      if ($scope.preferencesForm.$valid) {

        // Update the user
        $scope.user
          .$save(preferencesData)
          .then(function () {
            $scope.preferencesForm.$setPristine();

            flash.to($scope.alertIdentifierId).success = 'We\'ve successfully updated your preferences!';
          })
          .catch(function () {

            flash.to($scope.alertIdentifierId).error = 'We\'ve encountered an error while trying to update your preferences.';
          });
      }
    };

  });
