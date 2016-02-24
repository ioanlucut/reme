/* Friendly date filter */

angular
  .module('remeCommon')
  .filter('friendlyHour', function () {
    return function (date) {

      return moment(date).format('h:mm A');
    };
  });
