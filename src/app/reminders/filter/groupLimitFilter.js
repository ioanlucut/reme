angular
  .module('remeReminders')
  .filter('groupLimit', function (filterWatcher) {

    /**
     * Keeps the first `limit` reminders across the groups, by due date, without touching the input.
     * The input groups are memoized by `groupReminders`; changing them in place (as the 2016 version
     * did with `splice`) duplicated and lost reminders once a few were added.
     */
    function limitGroups(groups, limit, reverse) {
      var remaining = limit;
      var limited = [];

      _.each(groups, function (group) {
        if (remaining <= 0) {
          return false;
        }

        var values = _.sortBy(group.values, function (reminder) {
          return reminder.model.dueOn;
        });

        if (reverse) {
          values.reverse();
        }

        values = values.slice(0, remaining);
        remaining -= values.length;
        limited.push(_.extend({}, group, { values: values }));
      });

      return limited;
    }

    return function (inputGrouped, input, limit, reverse) {
      if (!angular.isArray(inputGrouped)) {
        return inputGrouped;
      }

      // A new array on every digest would never let ng-repeat settle, so memoize it like `groupReminders`.
      return filterWatcher.isMemoized('groupLimit', arguments) ||
        filterWatcher.memoize('groupLimit', arguments, this, limitGroups(inputGrouped, limit, reverse));
    };
  });
