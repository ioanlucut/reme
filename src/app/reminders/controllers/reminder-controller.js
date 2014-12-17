angular
    .module("reminders")
    .controller("ReminderCtrl", function ($scope, ReminderModalService) {

        $scope.cancel = function () {
            ReminderModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    });
