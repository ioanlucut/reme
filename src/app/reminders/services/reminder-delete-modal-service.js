/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderDeleteModalService", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (reminderToBeDeleted, reminderIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_delete_modal.html",
                controller: "ReminderDeleteModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function () {
                        return reminderToBeDeleted;
                    },
                    reminderIndex: function () {
                        return reminderIndex;
                    }
                }
            });
        };

    });
