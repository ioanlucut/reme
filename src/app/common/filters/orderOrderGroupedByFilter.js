angular
  .module('remeCommon')
  .filter('groupReminders', function ($parse, filterWatcher) {
    return function (reminders, reverse) {

      var isObject = angular.isObject,
        forEach = angular.forEach;

      if (!isObject(reminders)) {
        return reminders;
      }

      return filterWatcher.isMemoized('groupBy', arguments) ||
        filterWatcher.memoize('groupBy', arguments, this,
          _groupBy(reminders));

      // ---
      // Group by reminders function.
      // ---

      function _groupBy(reminders) {
        var groupedReminders = [];
        var matchingGroup;
        var matchingGroupName;

        forEach(reminders, function (reminder) {
          matchingGroup = reminder.matchingGroup;
          matchingGroupName = matchingGroup.name;

          if (!_.some(groupedReminders, function (group) {
              return group.name === matchingGroupName;
            })) {

            groupedReminders.push({ name: matchingGroupName, matchingGroup: matchingGroup, values: [] });
          }

          _.find(groupedReminders, function (group) {
            return group.name === matchingGroupName;
          }).values.push(reminder);
        });

        // ---
        // Comparator to sort reminders.
        // ---

        // Order groups by their earliest reminder. The 2016 version compared each group's reference
        // date, and "This month" (now) sorted before "Tomorrow" (now + 1 day).
        function firstDueOn(group) {
          return _.min(_.map(group.values, function (reminder) {
            return new Date(reminder.model.dueOn).getTime();
          }));
        }

        function remindersSortComparator(a, b) {
          return firstDueOn(a) - firstDueOn(b);
        }

        // ---
        // Sort reminders - +-reversed.
        // ---

        groupedReminders.sort(remindersSortComparator);

        if (reverse) {
          groupedReminders.reverse();
        }

        return groupedReminders;
      }
    };
  });
