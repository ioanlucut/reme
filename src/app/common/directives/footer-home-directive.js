/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("footerHome", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/footer-home.html",
            link: function (scope, el) {

            }
        };
    });
