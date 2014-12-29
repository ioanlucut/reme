/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, $rootScope, reminderList, ReminderDeleteModalService, ReminderUpdateModalService, ReminderGroupService, REMINDER_EVENTS, $log) {

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Past and upcoming reminders.
         * @type {{}}
         */
        var pastAndUpcomingReminders = ReminderGroupService.getPastAndUpcomingReminders(reminderList);

        /**
         * Upcoming reminders
         */
        $scope.upcomingReminders = pastAndUpcomingReminders.upcomingReminders;

        /**
         * Past reminders
         */
        $scope.pastReminders = pastAndUpcomingReminders.pastReminders;

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            if ( args.reminder.model.dueOn > new Date() ) {
                $scope.upcomingReminders.push(args.reminder);
            }
            else {
                $scope.pastReminders.push(args.reminder);
            }
        });

        /**
         * On reminder updated, simply display the message.
         */
        $scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            removeReminderFrom($scope.upcomingReminders, args.reminder);
            removeReminderFrom($scope.pastReminders, args.reminder);
        });

        /**
         * On reminder un subscribed, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isUnSubscribed, function (event, args) {

            removeReminderFrom($scope.upcomingReminders, args.reminder);
            removeReminderFrom($scope.pastReminders, args.reminder);
        });

        /**
         * Removes given reminder from the list.
         * @param reminderList
         * @param reminderToBeRemoved
         */
        function removeReminderFrom(reminderList, reminderToBeRemoved) {
            _.remove(reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(reminderToBeRemoved.model.reminderId, 10);
                var reminderFromArrayId = _.parseInt(reminderFromArray.model.reminderId, 10);
                if ( _.isNaN(reminderFromArrayId) || _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArrayId === reminderId;
            });
        }
    });