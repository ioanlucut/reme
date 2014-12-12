/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, reminderList, ReminderDeleteModalService) {
        $scope.reminderList = reminderList;

        $scope.cancel = function () {
            ReminderDeleteModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        $scope.openDeleteReminderModalService = function (reminder) {
            ReminderDeleteModalService.open(reminder.reminderId);
        };
    });