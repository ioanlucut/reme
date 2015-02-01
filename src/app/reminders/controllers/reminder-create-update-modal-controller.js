angular
    .module("reminders")
    .controller("ReminderModalCtrl", function ($scope, $rootScope, $stateParams, $window, ReminderModalService, ReminderUpdateModalService, reminder, reminderIndex, $timeout, StatesHandler, REMINDER_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS, DATE_SOURCE) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateReminder;

        /**
         * Keep master reminder.
         * @type {XMLList|XML|*}
         */
        $scope.masterReminder = reminder;

        /**
         * Work with a copy of master reminder
         */
        $scope.reminder = angular.copy($scope.masterReminder);

        /**
         * Flag which says whether reminder is new or not.
         */
        $scope.isNew = $scope.reminder.isNew();

        /**
         * Set the date source - if is update action.
         */
        if ( !$scope.isNew ) {
            $scope.reminder.model.dueOn[DATE_SOURCE.isFromUpdateAction] = true;
        }

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Minimum date to create reminder.
         * @type {Date}
         */
        $scope.minDate = moment().hours(0).minutes(0).seconds(0);

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
                    $scope.isModalOpened = true;
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
                    $scope.isModalOpened = true;
                }
            );
        }

        /**
         * Dismiss the create/update modal.
         */
        $scope.dismissFeedbackModal = function () {
            var currentModal = $scope.isNew ? ReminderModalService.modalInstance : ReminderUpdateModalService.modalInstance;
            currentModal.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Saves the reminder or updates it.
         * @param reminderForm
         */
        $scope.saveReminder = function (reminderForm) {
            if ( reminderForm.$valid && !$scope.isSaving ) {

                var isDateInPast = moment().diff($scope.reminder.model.dueOn || reminderForm.selectedDate) > 0;
                if ( reminderForm.selectedDate.$invalid && !isDateInPast ) {
                    reminderForm.selectedDate.$setValidity('validDate', false);
                    flash.to($scope.alertIdentifierId).error = "Please make sure that the date and time are in the future.";

                    return;
                }

                // Is saving reminder
                $scope.isSaving = true;

                // Ok, update master reminder.
                angular.copy($scope.reminder, $scope.masterReminder);

                $scope.masterReminder.save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track($scope.isNew ? MIXPANEL_EVENTS.reminderCreated : MIXPANEL_EVENTS.reminderUpdated);

                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                ReminderModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isCreated, {
                                    reminder: $scope.masterReminder,
                                    message: 'Reminder successfully saved!'
                                });
                            }, 800);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                // Close the modal
                                ReminderUpdateModalService.modalInstance.close();
                                $rootScope.$broadcast(REMINDER_EVENTS.isUpdated, {
                                    reminder: $scope.masterReminder,
                                    reminderIndex: reminderIndex,
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

                        $scope.isModalOpened = false;
                    });
            }
        };

    });
