angular
    .module("reminders")
    .controller("ReminderAutoOpenCtrl", function ($scope, $timeout, ReminderModalService) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ReminderModalService.open();
        });

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    });
