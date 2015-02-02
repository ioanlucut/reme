angular
    .module("common")
    .service("ReminderMatchingGroupService", function () {

        this.getRemindersGroups = function () {
            var now = moment();

            return [
                {
                    name: 'Today',
                    diff: { date: moment().set('day', now.day()), unit: 'day' }
                },
                {
                    name: 'Tomorrow',
                    diff: { date: moment().set('day', now.day() + 1), unit: 'day' }
                },
                {
                    name: 'Yesterday',
                    diff: { date: moment().set('day', now.day() - 1), unit: 'day' }
                },
                {
                    name: 'This month',
                    diff: { date: moment().set('month', now.month()), unit: 'month' }
                },
                {
                    name: 'Next month',
                    diff: { date: moment().set('month', now.month() + 1), unit: 'month' }
                },
                {
                    name: 'Last month',
                    diff: { date: moment().set('month', now.month() - 1), unit: 'month' }
                }
            ];
        };

        /**
         * Populate reminders with matching groups
         */
        this.populateRemindersWithMatchingGroups = function (reminders, reverseOrder) {
            var remindersGroup = this.getRemindersGroups();

            _.each(reminders, function (reminder) {
                var matchingGroupFound = _.find(remindersGroup, function (remindersGroup) {
                    return remindersGroup.diff.date.isSame(reminder.model.dueOn, remindersGroup.diff.unit);
                });

                if ( !matchingGroupFound ) {
                    var reminderDueOn = moment(reminder.model.dueOn);
                    var isSameYear = moment(moment().year()).isSame(reminderDueOn.year());

                    // ---
                    // If no matching group is found, create one with reminders month.
                    // ---

                    reminder.matchingGroup = {
                        name: reminderDueOn.format(isSameYear ? 'MMMM' : 'MMMM, YYYY'),
                        diff: {
                            date: moment(reminderDueOn), unit: 'month'
                        }
                    };
                }
                else {
                    reminder.matchingGroup = matchingGroupFound;
                }
            });
        };

        /**
         * Populate reminder with matching group
         */
        this.populateReminderWithMatchingGroup = function (reminder, reverseOrder) {
            return this.populateRemindersWithMatchingGroups([reminder], reverseOrder);
        };

    });
