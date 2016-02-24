/**
 * Header directive responsible for header common template.
 */
angular
  .module('remeCommon')
  .directive('footerHome', function () {
    return {
      restrict: 'A',
      templateUrl: '/app/common/partials/footerHome.html',
      link: function (scope, el) {

      },
    };
  });
