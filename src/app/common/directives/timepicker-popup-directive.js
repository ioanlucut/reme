/* Timepicker popup */

angular.module("common").
    directive("timepickerPopup", function (DatesUtils, DATE_SOURCE) {
        return {
            require: "ngModel",
            scope: {
                date: "=ngModel"
            },
            templateUrl: "app/common/partials/timepickerPopup/timepickerPopup.html",
            restrict: "A",
            link: function (scope, el, attrs) {

                /**
                 * Creates the times array based on a referenceDate.
                 * @param referenceDate
                 * @returns {Array}
                 */
                function createTimesArray(referenceDate) {

                    var now = new Date();
                    referenceDate = referenceDate || new Date();
                    referenceDate.setHours(0);
                    referenceDate.setMinutes(0);

                    var timestamp = referenceDate.getTime();
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
                            timestamp: timestamp,
                            inPast: timestamp < now.getTime()
                        });

                        timestamp += step * 60 * 1000;
                    }

                    return times;
                }

                // Generate the times.
                scope.times = createTimesArray();

                // Update selected index when date changes
                scope.$watch("date", function (date) {

                    // if is today and comes from nlp parser, let it be.
                    if ( moment().diff(date, 'day') === 0 && (date[DATE_SOURCE.isFromNlp] || date[DATE_SOURCE.isFromUpdateAction]) ) {
                        // skip
                    }
                    // if is today, set first valid time
                    else if ( moment().diff(date, 'day') === 0 ) {
                        date = DatesUtils.prepareDate(date);
                    }
                    else if ( moment().diff(date, 'day') < 0 && !(date[DATE_SOURCE.isFromNlp] || date[DATE_SOURCE.isFromUpdateAction]) ) {
                        scope.setTime(scope.times[0]);
                    }

                    for ( var i = 0; i < scope.times.length; i++ ) {
                        if ( date.getHours() == scope.times[i].hour && date.getMinutes() == scope.times[i].minute ) {
                            scope.setTime(scope.times[i]);

                            break;
                        }
                    }
                });

                /**
                 * Set date ng-model by selected time
                 * @param time
                 */
                scope.setTime = function (time) {
                    scope.selectedIndex = time.index;
                    scope.date.setHours(time.hour);
                    scope.date.setMinutes(time.minute);
                    reForceCheckValidity();
                };

                /**
                 * Validate if the date is in the past always after setting the time.
                 */
                function reForceCheckValidity() {
                    var isDateInPast = moment().diff(scope.date || scope.$parent.reminderForm.selectedDate) > 0;
                    if ( scope.$parent.reminderForm.selectedDate.$invalid && !isDateInPast ) {
                        scope.$parent.reminderForm.selectedDate.$setValidity('validDate', true);
                    }
                    else if ( scope.$parent.reminderForm.selectedDate.$valid && isDateInPast ) {
                        scope.$parent.reminderForm.selectedDate.$setValidity('validDate', false);
                    }
                }

                // Get the dropdown toggle and dropdown menu
                var dropdownToggle = el.children().eq(0);
                var dropdownMenu = el.children().eq(1);

                /**
                 * On click hook.
                 */
                dropdownToggle.on("click", function () {

                    // Find the selected item
                    var selectedItem = dropdownMenu.children().eq(scope.selectedIndex);

                    // Reset scrollTop
                    dropdownMenu.scrollTop(0);

                    // Calculate and apply scrollTop
                    var visibleItems = Math.round(dropdownMenu.height() / selectedItem.outerHeight());

                    var position = selectedItem.position();
                    if ( position && position.top ) {
                        var scrollTop = position.top - (Math.round(0.5 * visibleItems) - 1) * selectedItem.outerHeight();
                        dropdownMenu.scrollTop(Math.max(scrollTop, 0));

                        // Highlight the selected item
                        scope.highlightSelected = true;
                        scope.$apply();

                        // Update the perfect scrollbar
                        scope.$broadcast("perfectScrollbar:update", null);
                    }
                });

                /**
                 * On mouse enter hook
                 */
                dropdownMenu.on("mouseenter", function () {

                    // Stop highlighting the selected item
                    scope.highlightSelected = false;
                    scope.$apply();
                });
            }
        }
    });