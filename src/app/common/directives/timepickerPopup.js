/* Timepicker popup */

angular.module("common").
    directive("timepickerPopup", function () {
        return {
            require: "ngModel",
            scope: {
                date: "=ngModel"
            },
            templateUrl: "app/common/partials/timepickerPopup/timepickerPopup.html",
            restrict: "A",
            link: function (scope, el, attrs) {

                // Create the times array
                scope.times = function createTimesArray() {

                    var today = new Date();
                    today.setHours(0);
                    today.setMinutes(0);

                    var timestamp = today.getTime();
                    var step = scope.$eval(attrs.step) || 30;
                    var steps = 24 * 60 / step;
                    var times = [];

                    for ( var i = 0; i < steps; i++ ) {
                        var d = new Date(timestamp);
                        if ( scope.date.getHours() == d.getHours() && scope.date.getMinutes() == d.getMinutes() ) {
                            scope.selectedIndex = i;
                        }

                        times.push({
                            index: i,
                            hour: d.getHours(),
                            minute: d.getMinutes(),
                            timestamp: timestamp
                        });

                        timestamp += step * 60 * 1000;
                    }

                    return times;
                }();

                // Update selected index when date changes
                scope.$watch("date", function (date) {

                    // Init selectedIndex
                    scope.selectedIndex = null;

                    for ( var i = 0; i < scope.times.length; i++ ) {
                        if ( date.getHours() == scope.times[i].hour && date.getMinutes() == scope.times[i].minute ) {
                            scope.selectedIndex = i;
                        }
                    }
                });

                // Set time by hour and minute
                scope.setTime = function (i, hour, minute) {
                    scope.selectedIndex = i;
                    scope.date.setHours(hour);
                    scope.date.setMinutes(minute);
                };

                // Get the dropdown toggle and dropdown menu
                var dropdownToggle = el.children().eq(0);
                var dropdownMenu = el.children().eq(1);

                dropdownToggle.on("click", function () {

                    // Find the selected item
                    var selectedItem = dropdownMenu.children().eq(scope.selectedIndex);

                    // Reset scrollTop
                    dropdownMenu.scrollTop(0);

                    // Calculate and apply scrollTop
                    var visibleItems = Math.round(dropdownMenu.height() / selectedItem.outerHeight());
                    var scrollTop = selectedItem.position().top - (Math.round(0.5 * visibleItems) - 1) * selectedItem.outerHeight();
                    dropdownMenu.scrollTop(Math.max(scrollTop, 0));

                    // Highlight the selected item
                    scope.highlightSelected = true;
                    scope.$apply();

                    // Update the perfect scrollbar
                    scope.$broadcast("perfectScrollbar:update", null);
                });

                dropdownMenu.on("mouseenter", function () {

                    // Stop highlighting the selected item
                    scope.highlightSelected = false;
                    scope.$apply();
                });
            }
        }
    });
