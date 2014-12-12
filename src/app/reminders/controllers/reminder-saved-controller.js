/* Saved reminder controller */

angular
    .module("reminders")
    .controller("ReminderSavedCtrl", ["$rootScope", "$scope", "$state", "FeedbackModal", "reminder", function ($rootScope, $scope, $state, FeedbackModal, reminder) {

        $rootScope.$state = $state;
        $scope.reminder = reminder;

        // Open feedback modal
        $scope.openFeedbackModal = function () {
            FeedbackModal.open();
        };

    }]);
