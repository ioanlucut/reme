/* Saved reminder controller */

angular
    .module("reminders")
    .controller("ReminderSavedCtrl", ["$rootScope", "$scope", "$state", "FeedbackModal", "mixpanel", "reminder", function ($rootScope, $scope, $state, FeedbackModal, mixpanel, reminder) {

        // Track the event with Mixpanel
        var trackEvent = "Reminder saved";
        /*mixpanel.track(trackEvent);*/

        $rootScope.$state = $state;
        $scope.reminder = reminder;

        // Open feedback modal
        $scope.openFeedbackModal = function () {
            FeedbackModal.open();
        };

    }]);
