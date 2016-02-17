/**
 * Abstract error page controller.
 */
angular
  .module('reme.common')
  .controller('AbstractErrorPageCtrl', function ($scope, StatesHandler) {

    /**
     * Track event.
     */
    $scope.trackErrorEvent = function (event) {
      $scope.$emit('trackEvent', event);
    };

    /**
     * Continues to home page.
     */
    $scope.goToHomePage = function () {
      StatesHandler.goHome();
    };
  });
