/* Focus the first erroneous input on form submit */

angular
    .module("common")
    .directive("focusFirstError", [function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                var errorSelector = attrs.focusFirstError || ".form-control.ng-invalid";

                el.on("submit", function () {
                    el.find(errorSelector).first().focus();
                });
            }
        }
    }]);
