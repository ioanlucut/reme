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

                /**
                 * The reminder id.
                 */
                reminderId: "",

                /**
                 * The reminder text.
                 */
                text: "",

                /**
                 * The reminder due date
                 */
                dueOn: "",

                /**
                 * The timezone
                 */
                timezone: "",

                /**
                 * The recipients (array of object, with email as key)
                 */
                recipients: [],

                /**
                 * The user which is the owner of this reminder
                 */
                createdByUser: {},

                /**
                 * Reminder id of the user which created this reminder.
                 */
                createdBy: "",

                /**
                 * If reminder is already sent.
                 */
                sent: "",

                /**
                 * Create date of the reminder.
                 */
                createdAt: "",

                /**
                 * Update date of the reminder.
                 */
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
             * Is reminder in past.
             * @returns {boolean}
             */
            this.inPast = function () {
                if ( this.model.dueOn === "" || _.isUndefined(this.model.dueOn) ) {
                    return false;
                }
                return moment().diff(this.model.dueOn, 'days') > 0;
            };

            /**
             * The given email is the user of this reminder.
             * @returns {boolean}
             */
            this.isCreatedBy = function (email) {
                if ( _.isUndefined(email) ) {
                    return false;
                }

                return this.model.createdByUser.email === email;
            };

            /**
             * The recipients are more then one.
             * @returns {boolean}
             */
            this.isManyRecipients = function () {
                if ( _.isUndefined(this.model.recipients) ) {
                    return false;
                }

                return this.model.recipients.length > 1;
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
             * UnSubscribe a recipient from this reminder and update model with response.
             * @returns {*}
             */
            this.unSubscribe = function () {
                return ReminderService.unSubscribeFromReminder(this);
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