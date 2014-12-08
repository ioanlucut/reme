/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyDate', function () {
        return function (date) {

            var dateFormat = "{Weekday}, {dd} {Month} {yyyy}";

            // Use custom date format for Today and Tomorrow
            date.isToday() && (dateFormat = "Today, {dd} {Month} {yyyy}");
            date.isTomorrow() && (dateFormat = "Tomorrow, {dd} {Month} {yyyy}");

            return date.format(dateFormat);

        };
    });
