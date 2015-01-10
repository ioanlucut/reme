/* Feedback modal */

angular
    .module("reminders")
    .service("ReminderModalService", function ($modal) {

        /**
         * Reminder modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define reminder modal object.
         */
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/reminders/partials/reminderModal/reminder_create_update_modal.html",
                controller: "ReminderModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    reminder: function ($window, $rootScope, Reminder, DatesUtils) {
                        return Reminder.build({
                            text: "",
                            dueOn: DatesUtils.prepareDate(),
                            timezone: jstz.determine().name(),
                            recipients: [{ email: $rootScope.currentUser.model.email }]
                        });
                    },
                    reminderIndex: function () {
                        return -1;
                    }
                }
            });
        };

    });
