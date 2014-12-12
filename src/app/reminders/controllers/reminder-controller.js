angular
    .module("reminders")
    .controller("ReminderCtrl", ["$scope", "ReminderModalService", "$timeout", function ($scope, ReminderModalService, $timeout) {

        $scope.cancel = function () {
            ReminderModalService.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    }]);
