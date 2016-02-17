/* Friendly date filter */

angular
  .module('reme.common')
  .filter('friendlyDate', function () {
    return function (date) {

      if (!_.isDate(date)) {
        date = moment(date).toDate();
      }

      return moment(date).calendar();
    };
  });
