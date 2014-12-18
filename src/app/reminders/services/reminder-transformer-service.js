/**
 * Reminder transformer service which transforms a reminder DTO model object to a reminder business object.
 */
angular
    .module("reminders")
    .service("ReminderTransformerService", function (Reminder) {

        /**
         * Transform a reminder as JSON to a business object.
         * @param reminderAsDto
         * @returns {*}
         */
        this.transformReminderToBusinessModel = function (reminderAsDto) {
            return Reminder.build(reminderAsDto);
        };

        /**
         * Transform a list of reminders as JSON to a list of reminders as business object.
         * @param reminderDtoList
         * @returns {Array}
         */
        this.transformRemindersToBusinessModel = function (reminderDtoList) {
            var reminderDtoBusiness = [];

            _.each(reminderDtoList, _.bind(function (value) {
                reminderDtoBusiness.push(this.transformReminderToBusinessModel(value));
            }, this));

            return reminderDtoBusiness;
        };
    });
