/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyHour', function () {
        return function (date) {

            return moment(date).format("h:mm A");
        };
    });
