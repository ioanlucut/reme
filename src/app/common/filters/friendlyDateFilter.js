/* Friendly date filter */

angular
  .module('remeCommon')
  .filter('friendlyDate', function () {
    return function (date) {

      if (!_.isDate(date)) {
        date = moment(date).toDate();
      }

      return moment(date).calendar();
    };
  });
