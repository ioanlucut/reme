/* Friendly date filter */

angular
    .module("common")
    .filter('friendlyDate', function (moment) {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date).toDate();
            }

            return moment(date).calendar();
        };
    });
