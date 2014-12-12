/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, reminderList) {
        $scope.reminderList = reminderList;
    });