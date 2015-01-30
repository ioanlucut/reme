angular
    .module("common")
    .service("ReminderGroupsProvider", function () {

        this.getRemindersGroups = function () {
            var now = moment();

            return [
                {
                    name: 'Today',
                    diff: { date: moment().set('day', now.day()), unit: 'day', priority: 0 }
                },
                {
                    name: 'Tomorrow',
                    diff: { date: moment().set('day', now.day() + 1), unit: 'day', priority: 1 }
                },
                {
                    name: 'Yesterday',
                    diff: { date: moment().set('day', now.day() - 1), unit: 'day', priority: 1 }
                },
                {
                    name: 'This month',
                    diff: { date: moment().set('month', now.month()), unit: 'month', priority: 2 }
                },
                {
                    name: 'Next month',
                    diff: { date: moment().set('month', now.month() + 1), unit: 'month', priority: 3 }
                },
                {
                    name: 'Last month',
                    diff: { date: moment().set('month', now.month() - 1), unit: 'month', priority: 3 }
                }
            ];
        };

        this.getPastGroup = function () {
            var now = moment();

            return {
                name: 'Past',
                diff: { date: moment().set('year', now.year() - 1), unit: 'year', priority: 4 }
            };
        };

        this.getFutureGroup = function () {
            var now = moment();

            return {
                name: 'Upcoming',
                diff: { date: moment().set('year', now.year() + 1), unit: 'year', priority: 4 }
            };
        };

        /**
         * Populate reminders with matching groups
         */
        this.populateRemindersWithMatchingGroups = function (reminders, reverseOrder) {
            var remindersGroup = this.getRemindersGroups();
            var past = this.getPastGroup();
            var future = this.getFutureGroup();

            _.each(reminders, function (reminder) {
                var matchingGroupFound = _.find(remindersGroup, function (remindersGroup) {
                    return remindersGroup.diff.date.isSame(reminder.model.dueOn, remindersGroup.diff.unit);
                });

                if ( !matchingGroupFound ) {
                    reminder.matchingGroup = reverseOrder ? past : future;
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
