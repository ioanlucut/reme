/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("footer", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer.html",
            link: function (scope, el) {

            }
        };
    });
