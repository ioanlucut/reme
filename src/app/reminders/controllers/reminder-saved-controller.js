/* Saved reminder controller */

angular
    .module("reminders")
    .controller("ReminderSavedCtrl", function ($rootScope, $scope, $state, FeedbackModal, reminder) {

        $rootScope.$state = $state;
        $scope.reminder = reminder;

        // Open feedback modal
        $scope.openFeedbackModal = function () {
            FeedbackModal.open();
        };

    });
