/**
 * Header directive responsible for header common template.
 */
angular
  .module('reme.common')
  .directive('flashMessages', function () {
    return {
      scope: {
        flash: '=',
        identifierId: '@',
      },
      restrict: 'A',
      templateUrl: '/app/common/partials/flash-messages.html',
      link: function (scope, el, attrs) {
      },
    };
  });
