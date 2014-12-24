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
         * Used to check the past/upcoming reminders.
         * @type {Date}
         */
        var now = new Date();

        /**
         * Group reminders by upcoming and past reminders.
         * @returns {*}
         */
        function groupRemindersByUpcomingAndPast() {

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

        var upcomingReminders = [];
        var pastReminders = [];
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

        /**
         * Upcoming reminders
         */
        $scope.upcomingReminders = upcomingReminders;

        /**
         * Past reminders
         */
        $scope.pastReminders = pastReminders;

        /**
         * Open DELETE modal
         * @param reminder
         */
        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder);
        };

        /**
         * Open UN SUBSCRIBE modal - which is the same as DELETE modal.
         * @param reminder
         */
        $scope.openUnSubscribeReminderModalService = function (reminder) {
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
         * On reminder un subscribed, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isUnSubscribed, function (event, args) {
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