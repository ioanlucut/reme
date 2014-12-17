/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, reminderList, ReminderDeleteModalService, ReminderUpdateModalService, REMINDER_EVENTS, $log, flash) {
        $scope.reminderList = reminderList;

        $scope.cancel = function () {
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        /**
         * Open DELETE modal
         * @param reminder
         */
        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder.reminderId);
        };

        /**
         * Open UPDATE modal
         * @param reminder
         */
        $scope.openUpdateReminderModalService = function (reminder) {
            ReminderUpdateModalService.open(reminder.reminderId);
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            flash.success = args.message;

            $scope.reminderList.push(args.reminder);
        });

        /**
         * On reminder updated, simply display the message.
         */
        $scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
            flash.success = args.message;

            removeReminderFrom($scope.reminderList, args.reminder);
            $scope.reminderList.push(args.reminder);
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            flash.success = args.message;

            removeReminderFrom($scope.reminderList, args.reminder);
        });

        /**
         * Removes given reminder from the list.
         * @param reminderList
         * @param reminderToBeRemoved
         */
        function removeReminderFrom(reminderList, reminderToBeRemoved) {
            _.remove(reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(reminderToBeRemoved.reminderId, 10);
                var reminderFromArrayId = _.parseInt(reminderFromArray.reminderId, 10);
                if ( _.isNaN(reminderFromArrayId) || _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArrayId === reminderId;
            });
        }
    });