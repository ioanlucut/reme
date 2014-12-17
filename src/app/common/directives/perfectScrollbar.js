/* Perfect scrollbar */

angular
    .module("common")
    .directive("perfectScrollbar", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                // Init the perfect scrollbar
                el.perfectScrollbar({
                    wheelSpeed: scope.$eval(attrs.wheelSpeed) || 50,
                    wheelPropagation: scope.$eval(attrs.wheelPropagation) || false,
                    minScrollbarLength: scope.$eval(attrs.minScrollbarLength) || false,
                    useBothWheelAxes: scope.$eval(attrs.useBothWheelAxes) || false,
                    useKeyboard: scope.$eval(attrs.useKeyboard) || true,
                    suppressScrollX: scope.$eval(attrs.suppressScrollX) || false,
                    suppressScrollY: scope.$eval(attrs.suppressScrollY) || false,
                    scrollXMarginOffset: scope.$eval(attrs.scrollXMarginOffset) || 0,
                    scrollYMarginOffset: scope.$eval(attrs.scrollYMarginOffset) || 0
                });

                // Update the perfect scrollbar
                attrs.updateOn && scope.$on(attrs.updateOn, function () {
                    el.perfectScrollbar("update");
                });
            }
        }
    });
