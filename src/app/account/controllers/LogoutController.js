/**
 * Logout controller responsible for user logout actions.
 */
angular
  .module('remeAccount')
  .controller('LogoutCtrl', function ($scope, $timeout, StatesHandler, isSuccessfullyLoggedOut) {

    $scope.isSuccessfullyLoggedOut = isSuccessfullyLoggedOut;

    /**
     * Redirect to home after 1,5 sec.
     */
    $timeout(function () {
      StatesHandler.goHome();
    }, 1500);

  });
