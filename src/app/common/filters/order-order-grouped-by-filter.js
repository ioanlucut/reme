angular
    .module('common')
    .filter('groupReminders', function ($parse, filterWatcher) {
        return function (reminders, reverse) {

            var isObject = angular.isObject,
                forEach = angular.forEach;

            if ( !isObject(reminders) ) {
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

                    if ( !_.some(groupedReminders, function (group) {
                            return group.name === matchingGroupName;
                        }) ) {
                        groupedReminders.push({ name: matchingGroupName, matchingGroup: matchingGroup, values: [] });
                    }

                    _.find(groupedReminders, function (group) {
                        return group.name === matchingGroupName;
                    }).values.push(reminder);
                });

                // ---
                // Comparator to sort reminders.
                // ---

                function remindersSortComparator(a, b) {
                    // A less than B
                    if ( a.matchingGroup.diff.date < b.matchingGroup.diff.date )
                        return -1;
                    // A greater than B
                    if ( a.matchingGroup.diff.date > b.matchingGroup.diff.date )
                        return 1;
                    // A greater than B
                    if ( a.matchingGroup.name === 'Today' && b.matchingGroup.name === 'This month' ) {
                        return -1;
                    }
                    return 0;
                }

                // ---
                // Sort reminders - +-reversed.
                // ---

                groupedReminders.sort(remindersSortComparator);

                if ( reverse ) {
                    groupedReminders.reverse();
                }

                return groupedReminders;
            }
        }
    });