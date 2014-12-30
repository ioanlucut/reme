/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyDate', function (moment) {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date).toDate();
            }

            var dateFormat = "{Weekday}, {dd} {Month} {yyyy}";

            // Use custom date format for Today and Tomorrow
            /*            date.isToday() && (dateFormat = "Today, {dd} {Month} {yyyy}");
             date.isTomorrow() && (dateFormat = "Tomorrow, {dd} {Month} {yyyy}");*/

            return moment(date).calendar();

            /*return date.format(dateFormat);*/

        };
    });
