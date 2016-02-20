/**
 * Header directive responsible for header common template.
 */
angular
  .module('remeCommon')
  .directive('footer', function () {
    return {
      restrict: 'A',
      templateUrl: '/app/common/partials/footer.html',
      link: function (scope, el) {

      },
    };
  });
