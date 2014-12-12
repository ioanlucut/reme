angular
    .module("reminders")
    .controller("ReminderModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$", "URLTo", "ReminderModalService", "reminder", "$timeout", "StatesHandler", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderModalService, reminder, $timeout, StatesHandler) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * Flag which represents wheter
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Reminder examples pool
         * @type {string[]}
         */
        var reminderExamples = [
            "Pay rent @tomorrow at 3pm",
            "Josh's birthday party @next Friday at 18:00",
            "Christmas gifts @dec 20 at 3pm",
            "Send email to Rachel @in 4 hours",
            "Team meeting @10am",
            "My brother's wedding next month @June 22"
        ];

        /**
         * Random reminder example
         * @type {string}
         */
        $scope.randomExample = reminderExamples[Math.floor((Math.random() * reminderExamples.length))];

        // Focus the first input when modal is opened
        ReminderModalService.modalInstance
            .opened
            .then(function () {
                $scope.isOpen = true;
            }
        );

        // Save the reminder
        $scope.saveReminderAndClose = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {

                // Is saving reminder
                $scope.isSaving = true;

                $scope.reminder.create()
                    .then(function () {

                        // Wait 1 seconds, and close the modal
                        $timeout(function () {
                            ReminderModalService.modalInstance.close();
                        }, 1000);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
