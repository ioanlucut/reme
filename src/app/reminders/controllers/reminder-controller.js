angular
    .module("reminders")
    .controller("ReminderCtrl", function ($scope, ReminderModalService) {

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    });
