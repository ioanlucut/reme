angular
    .module("reminders")
    .controller("ReminderDeleteModalCtrl", ["$scope", "$rootScope", "$stateParams", "$window", "$", "URLTo", "ReminderDeleteModalService", "reminder", "$timeout", "StatesHandler", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderDeleteModalService, reminder, $timeout, StatesHandler) {

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
                    .then(function () {

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                        }, 1000);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    }]);
