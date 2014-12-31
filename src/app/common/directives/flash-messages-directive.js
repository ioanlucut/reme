/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("flashMessages", function () {
        return {
            scope: {
                flash: "="
            },
            restrict: "A",
            templateUrl: "app/common/partials/flash-messages.html",
            link: function (scope, el) {
            }
        };
    });
