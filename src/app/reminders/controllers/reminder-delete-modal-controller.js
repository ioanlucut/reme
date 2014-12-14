angular
    .module("reminders")
    .controller("ReminderDeleteModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$", "URLTo", "ReminderDeleteModalService", "reminder", "$timeout", "StatesHandler", "REMINDER_EVENTS", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderDeleteModalService, reminder, $timeout, StatesHandler, REMINDER_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        // Focus the first input when modal is opened
        ReminderDeleteModalService.modalInstance
            .opened
            .then(function () {
                $scope.isOpen = true;
            }
        );

        // Remove the reminder
        $scope.deleteReminderAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting reminder
                $scope.isDeleting = true;

                // Destroy reminder
                $scope.reminder.destroy()
                    .then(function (reminderAsResponse) {

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                        }, 1000);

                        $timeout(function () {
                            $rootScope.$broadcast(REMINDER_EVENTS.isDeleted, {
                                reminder: $scope.reminder.model,
                                message: 'Reminder successfully deleted!'
                            });
                        }, 1500);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
