angular
    .module("reminders")
    .controller("ReminderCtrl", function ($scope, ReminderModalService) {

        /**
         * Open reminder modal service.
         */
        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    });
