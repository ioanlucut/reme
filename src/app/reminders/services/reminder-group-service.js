/**
 * Reminder group service which computes the upcoming and past reminders from a list.
 */
angular
    .module("reminders")
    .service("ReminderGroupService", function () {

        /**
         * Returns an object with past and upcoming reminders.
         * @param reminders
         * @returns {{}}
         */
        this.getPastAndUpcomingReminders = function (reminders) {

            /**
             * Used to check the past/upcoming reminders.
             * @type {Date}
             */
            var now = new Date();

            /**
             * Reminders grouped by upcoming and past reminders.
             */
            var remindersGrouped = _.chain(reminders)
                .groupBy(function (element) {
                    return element.model.dueOn < now;
                })
                .toArray()
                .value();

            /**
             * To be computed
             * @type {Array}
             */
            var upcomingReminders = [];
            var pastReminders = [];

            /**
             * We group reminders by date, but if they are all in the same category, they will always be on the first category
             */
            if ( remindersGrouped.length === 2 ) {
                upcomingReminders = remindersGrouped[0];
                pastReminders = remindersGrouped[1];
            }
            else if ( remindersGrouped.length === 1 ) {
                var firstGroupedRemindersResult = remindersGrouped[0];
                var groupedRemindersAreInPast = firstGroupedRemindersResult[0].model.dueOn < now;

                if ( groupedRemindersAreInPast ) {
                    pastReminders = firstGroupedRemindersResult;
                }
                else {
                    upcomingReminders = firstGroupedRemindersResult;
                }
            }

            return {
                pastReminders: pastReminders,
                upcomingReminders: upcomingReminders
            }

        };
    });
