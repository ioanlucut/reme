angular
    .module('common')
    .filter('groupReminders', function ($parse, filterWatcher) {
        return function (reminders, reversed) {

            var isObject = angular.isObject,
                forEach = angular.forEach;

            if ( !isObject(reminders) ) {
                return reminders;
            }

            return filterWatcher.isMemoized('groupBy', arguments) ||
                filterWatcher.memoize('groupBy', arguments, this,
                    _groupBy(reminders));

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

                function remindersSortComparator(a, b) {
                    if ( a.matchingGroup.diff.date < b.matchingGroup.diff.date )
                        return -1;
                    if ( a.matchingGroup.diff.date > b.matchingGroup.diff.date )
                        return 1;
                    return 0;
                }

                groupedReminders.sort(remindersSortComparator);
                if ( reversed ) {
                    groupedReminders.reverse();
                }

                return groupedReminders;
            }
        }
    });