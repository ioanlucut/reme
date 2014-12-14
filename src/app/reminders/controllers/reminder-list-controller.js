/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, reminderList, ReminderDeleteModalService, REMINDER_EVENTS, $log, flash) {
        $scope.reminderList = reminderList;

        $scope.cancel = function () {
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder.reminderId);
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            flash.success = args.message;

            $scope.reminderList.push(args.reminder);
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            flash.success = args.message;

            _.remove($scope.reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(args.reminder.reminderId, 10);
                if ( _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArray.reminderId === reminderId;
            });
        });
    });