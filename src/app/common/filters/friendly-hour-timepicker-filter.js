/* Friendly date filter */

angular
  .module('reme.common')
  .filter('friendlyHourTimePicker', function () {
    return function (date) {

      return moment(date).format('hh:mm A');
    };
  });
