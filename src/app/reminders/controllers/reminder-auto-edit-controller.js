angular
    .module("reminders")
    .controller("ReminderAutoEditCtrl", function ($scope, $timeout, ReminderModalService, ReminderUpdateModalService, reminderToReview) {

        /**
         * Auto open the modal.
         */
        $timeout(function () {
            ReminderUpdateModalService.open(reminderToReview, -1);
        });

        $scope.openReminderModalService = function () {
            ReminderModalService.open();
        };
    });
