/**
 * Header directive responsible for header common template.
 */
angular
  .module('remeCommon')
  .directive('headerHome', function ($rootScope) {
    return {
      restrict: 'A',
      templateUrl: '/app/common/partials/headerHome.html',
      link: function (scope, el) {

        /**
         * Reference to the current user.
         * @type {$rootScope.currentUser|*}
         */
        scope.currentUser = $rootScope.currentUser;
      },
    };
  });
