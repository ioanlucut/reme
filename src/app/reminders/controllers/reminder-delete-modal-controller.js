angular
    .module("reminders")
    .controller("ReminderDeleteModalCtrl", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderDeleteModalService, reminder, $timeout, StatesHandler, REMINDER_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        /**
         * Remove reminder - owner action;
         */
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
                            $rootScope.$broadcast(REMINDER_EVENTS.isDeleted, {
                                reminder: $scope.reminder,
                                message: 'Reminder successfully deleted!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

        /**
         * Unsubscribe from reminder - recipient action.
         */
        $scope.unSubscribeFromReminderAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting reminder
                $scope.isDeleting = true;

                $scope.reminder.unSubscribe($scope.user.model.email)
                    .then(function () {

                        $timeout(function () {
                            ReminderDeleteModalService.modalInstance.close();
                            $rootScope.$broadcast(REMINDER_EVENTS.isUnSubscribed, {
                                reminder: $scope.reminder,
                                message: 'Reminder successfully removed!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    });
