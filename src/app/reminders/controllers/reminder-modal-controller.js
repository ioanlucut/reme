angular
    .module("reminders")
    .controller("ReminderModalCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$window", "$", "URLTo", "ReminderModalService", "reminder", "$timeout", "StatesHandler", function ($scope, $rootScope, $state, $stateParams, $window, $, URLTo, ReminderModalService, reminder, $timeout, StatesHandler) {

        $rootScope.$state = $state;
        $scope.reminder = reminder;
        $scope.isSaving = false;
        $scope.isNew = $scope.reminder.isNew();

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
        $scope.saveReminderAndClose = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {
                $scope.isSaving = true;
                $scope.reminder.create()
                    .then(function (response) {

                        // Reminder saved
                        $scope.isSaving = false;
                        $scope.isSent = true;

                        StatesHandler.refreshCurrentState();
                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ReminderModalService.modalInstance.close();
                        }, 1500);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    }).
                    finally(function () {
                        $scope.isSending = false;
                        $scope.isOpen = false;
                    });
            }
        };
    }]);
