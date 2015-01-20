angular
    .module("common")
    .directive("animate", function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {

                // Apply the animate class when the given event occurs
                scope.$on(attrs.animateOn, function () {
                    el.addClass(attrs.animateClass);
                });

                // Remove the animate class on animation end
                el.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    el.removeClass(attrs.animateClass);
                });
            }
        }
    });
