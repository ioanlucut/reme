/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("headerHome", function () {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header-home.html",
            link: function (scope, el) {

            }
        };
    });
