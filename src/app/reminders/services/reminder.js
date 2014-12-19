angular
    .module("reminders")
    .factory("Reminder", function ($q, $http, ReminderService, ReminderTransformerService) {

        /**
         * Reminder class.
         * @constructor
         */
        function Reminder() {

            /**
             * Represents the DTO model of the reminder.
             */
            this.model = {
                reminderId: "",
                text: "",
                dueOn: "",
                timezone: "",
                additionalAddresses: [],
                createdBy: "",
                sent: "",
                createdAt: "",
                updatedAt: ""
            };

            /**
             * Is reminder new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.reminderId === "" || _.isUndefined(this.model.reminderId);
            };

            /**
             * Saves a reminder and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return ReminderService.createReminder(this);
                }
                else {
                    return ReminderService.updateReminder(this);
                }
            };

            /**
             * Fetches and updates existing reminder.
             * @param reminderId
             * @returns {*}
             */
            this.fetch = function (reminderId) {
                return ReminderService.getDetails(reminderId);
            };

            /**
             * Destroys (deletes) a reminder.
             * @returns {*}
             */
            this.destroy = function () {
                return ReminderService.deleteReminder(this);
            };

        }

        /**
         * Builds a reminder with given data.
         * @param data
         * @returns {Reminder}
         */
        Reminder.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Reminder();
            }

            return ReminderTransformerService.toReminder(data, new Reminder());
        };

        return Reminder;
    });