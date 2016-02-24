/**
 * Header directive responsible for header common template.
 */
angular
  .module('remeCommon')
  .directive('flashMessages', function () {
    return {
      scope: {
        flash: '=',
        identifierId: '@',
      },
      restrict: 'A',
      templateUrl: '/app/common/partials/flashMessages.html',
      link: function (scope, el, attrs) {
      },
    };
  });
