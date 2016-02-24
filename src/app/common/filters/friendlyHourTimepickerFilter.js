/* Friendly date filter */

angular
  .module('remeCommon')
  .filter('friendlyHourTimePicker', function () {
    return function (date) {

      return moment(date).format('hh:mm A');
    };
  });
