/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderUpdateModalService", ["$modal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderId) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminderModal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: ["Reminder", function (Reminder) {
                        return new Reminder.build({}).fetch(reminderId);
                    }]
                }
            });
        };

    }]);
