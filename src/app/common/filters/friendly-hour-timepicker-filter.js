/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHourTimePicker', function (moment) {
        return function (date) {

            return moment(date).format("hh:mm A");
        };
    });
