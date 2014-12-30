/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHour', function (moment) {
        return function (date) {

            return moment(date).format("h:mm A");
        };
    });
