/* Auto focus */

angular
    .module("common")
    .directive("autoFocus", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                if ( !attrs.autoFocus ) {

                    // No model to watch, focus the element
                    el.focus();
                }
                else {

                    // Watch the specified model, and auto-focus the element when the model is "true"
                    scope.$watch(attrs.autoFocus, function (val) {
                        if ( val === true ) {
                            $timeout(function () {
                                el.focus();
                            });
                        }
                    });
                }
            }
        }
    });
