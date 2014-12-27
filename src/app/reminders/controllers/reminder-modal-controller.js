angular
    .module("reminders")
    .controller("ReminderModalCtrl", function ($scope, $rootScope, $stateParams, $window, $, URLTo, ReminderModalService, ReminderUpdateModalService, reminder, $timeout, StatesHandler, REMINDER_EVENTS) {

        /**
         * Reminder to be created (injected with few default values)
         */
        $scope.reminder = reminder;

        /**
         * Flag which says whether reminder is new or not.
         */
        $scope.isNew = $scope.reminder.isNew();

        /**
         * Flag which represents whether
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

        /**
         * If create reminder modal is opened
         */
        if ( ReminderModalService.modalInstance ) {
            ReminderModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isOpen = true;
                }
            );
        }

        /**
         * If update reminder modal is opened
         */
        if ( ReminderUpdateModalService.modalInstance ) {
            ReminderUpdateModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isOpen = true;
                }
            );
        }

        // Save the reminder
        $scope.saveReminder = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {

                // Is saving reminder
                $scope.isSaving = true;

                $scope.reminder.save()
                    .then(function () {

                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                ReminderModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isCreated, {
                                    reminder: $scope.reminder,
                                    message: 'Reminder successfully saved!'
                                });
                            }, 800);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                ReminderUpdateModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isUpdated, {
                                    reminder: $scope.reminder,
                                    message: 'Reminder successfully updated!'
                                });
                            }, 800);
                        }
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isOpen = false;
                    });
            }
        };

    });
