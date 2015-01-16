/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderUpdateModalService", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderToBeUpdated, reminderIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_create_update_modal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function () {
                        return reminderToBeUpdated;
                    },
                    reminderIndex: function () {
                        return reminderIndex;
                    }
                }
            });
        };

    });
