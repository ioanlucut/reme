/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderModalService", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminderModal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function ($window, Reminder, jstz) {
                        var defaultDueOn = Date.create().addHours(1).set({minute: 0, second: 0});

                        return Reminder.build({
                            text: "",
                            dueOn: defaultDueOn,
                            timezone: jstz.determine().name(),
                            additionalAddresses: []
                        });
                    }
                }
            });
        };

    });
