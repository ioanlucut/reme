/**
 * 404 page controller.
 */
angular
  .module('reme.common')
  .controller('Error404PageCtrl', function ($scope, $controller, USER_ACTIVITY_EVENTS) {

    /**
     * Inherit from this controller
     */
    $controller('AbstractErrorPageCtrl', { $scope: $scope });

    /**
     * Track error event
     */
    $scope.trackErrorEvent(USER_ACTIVITY_EVENTS.error404);
  });
