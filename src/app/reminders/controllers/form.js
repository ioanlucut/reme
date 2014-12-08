/* Reminder Form Controller */

angular
    .module("reminders")
    .controller("ReminderFormCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$window", "$", "URLTo", "FeedbackModal", "ReminderCache", "reminder", function ($scope, $rootScope, $state, $stateParams, $window, $, URLTo, FeedbackModal, ReminderCache, reminder) {

        $rootScope.$state = $state;
        $scope.reminder = reminder;
        $scope.isSaving = false;
        $scope.isNew = $scope.reminder.isNew();

        // Track the event with Mixpanel
        var trackEvent = $scope.isNew ? "Create page loaded" : "Update page loaded";
        /*mixpanel.track(trackEvent);*/

        // Reminder examples
        var reminderExamples = [
            "Pay rent @tomorrow at 3pm",
            "Josh's birthday party @next Friday at 18:00",
            "Christmas gifts @dec 20 at 3pm",
            "Send email to Rachel @in 4 hours",
            "Team meeting @10am",
            "My brother's wedding next month @June 22"
        ];

        // Get a random example
        var index = Math.floor((Math.random() * reminderExamples.length));
        $scope.randomExample = reminderExamples[index];

        // Save the reminder
        $scope.saveReminder = function () {

            if ( $scope.reminderForm.$valid && !$scope.isSaving ) {

                // Save the reminder
                $scope.isSaving = true;
                $scope.reminder.save().

                    then(function () {

                        // Reminder saved
                        $scope.isSaving = false;

                        // Cache the reminder
                        ReminderCache.put($scope.reminder.attr("secure_id"), $scope.reminder);

                        // Save the email address to local storage for future use
                        $window.localStorage.reminderCreatedBy = $scope.reminder.attr("created_by");

                        $state.go("saved", {secureId: $scope.reminder.attr("secure_id")});
                    }).

                    catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    });

            }
            else {
                $scope.reminderForm.submitted = true;
            }
        };

        // Open feedback modal
        $scope.openFeedbackModal = function () {
            FeedbackModal.open();
        };

    }]);
