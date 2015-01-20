/**
 * Reminder transformer service which transforms a reminder DTO model object to a reminder business object.
 */
angular
    .module("reminders")
    .service("ReminderTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a reminder business object model to a reminderDto object.
         * @param reminder
         * @param skipKeys
         * @returns {{}}
         */
        this.toReminderDto = function (reminder, skipKeys) {
            var reminderDto = {};

            TransformerUtils.copyKeysFromTo(reminder.model, reminderDto, skipKeys);
            if ( reminderDto.dueOn ) {
                reminderDto.dueOn = reminderDto.dueOn.format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            }
            reminderDto.text = $.trim(reminderDto.text.split("@")[0]);
            reminderDto.recipients = TransformerUtils.sanitizeRecipients(reminderDto.recipients);

            return reminderDto;
        };

        /**
         * Converts a reminderDto object to a reminder business object model.
         * @param reminderDto
         * @param reminder
         * @param skipKeys
         * @returns {*}
         */
        this.toReminder = function (reminderDto, reminder, skipKeys) {
            reminder = reminder || $injector.get('Reminder').build();

            TransformerUtils.copyKeysFromTo(reminderDto, reminder.model, skipKeys);

            // handle date conversion
            if ( reminder.model.dueOn ) {
                reminder.model.dueOn = moment(reminder.model.dueOn).toDate();
            }
            //handle addresses conversion
            var recipient = reminder.model.recipients;
            if ( _.isEmpty(recipient) ) {
                reminder.model.recipients = [];
            }
            else if ( _.isArray(recipient) ) {
                reminder.model.recipients = recipient;
            }

            return reminder;
        };

        /**
         * Transform a list of reminders as JSON to a list of reminders as business object.
         * @param reminderDtos
         * @returns {Array}
         */
        this.toReminders = function (reminderDtos) {
            var reminders = [];

            _.each(reminderDtos, _.bind(function (reminderDto) {
                reminders.push(this.toReminder(reminderDto));
            }, this));

            return reminders;
        };
    });
