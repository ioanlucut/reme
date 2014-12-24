/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, $rootScope, reminderList, ReminderDeleteModalService, ReminderUpdateModalService, REMINDER_EVENTS, $log, flash) {

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Group reminders by upcoming and past reminders.
         * @returns {*}
         */
        function groupRemindersByUpcomingAndPast() {
            var now = new Date();

            return _.chain(reminderList)
                .groupBy(function (element, index) {
                    return element.model.dueOn < now;
                })
                .toArray()
                .value();
        }

        /**
         * Reminders grouped by upcoming and past reminders.
         */
        var remindersGrouped = groupRemindersByUpcomingAndPast();

        /**
         * Upcoming reminders
         */
        $scope.upcomingReminders = remindersGrouped[0] || [];

        /**
         * Past reminders
         */
        $scope.pastReminders = remindersGrouped[1] || [];

        /**
         * Open DELETE modal
         * @param reminder
         */
        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder);
        };

        /**
         * Open UPDATE modal
         * @param reminder
         */
        $scope.openUpdateReminderModalService = function (reminder) {
            ReminderUpdateModalService.open(reminder);
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            flash.success = args.message;

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
            flash.success = args.message;
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            flash.success = args.message;

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