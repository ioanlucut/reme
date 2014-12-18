/**
 * Reminder transformer service which transforms a reminder DTO model object to a reminder business object.
 */
angular
    .module("reminders")
    .service("ReminderTransformerService", function ($injector) {

        /**
         * Converts a reminder business object model to a reminderDto object.
         * @param reminder
         * @param skipKeys
         * @returns {{}}
         */
        this.toReminderDto = function (reminder, skipKeys) {
            var reminderDto = {};

            this.copyKeysFromTo(reminder.model, reminderDto, skipKeys);
            reminderDto["dueOn"] = reminderDto["dueOn"].format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
            reminderDto["additionalAddresses"] = reminderDto["additionalAddresses"].join(",");

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
            this.copyKeysFromTo(reminderDto, reminder.model, skipKeys);

            // handle date conversion
            if ( reminder.model["dueOn"] ) {
                reminder.model["dueOn"] = moment(reminder.model["dueOn"]).toDate();
            }
            //handle addresses conversion
            var additionAddresses = reminder.model["additionalAddresses"];
            if ( _.isEmpty(additionAddresses) ) {
                reminder.model["additionalAddresses"] = [];
            }
            else {
                reminder.model["additionalAddresses"] = _.values(additionAddresses.split(","));
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

        /**
         * Copies keys from a sourceObject to a targetObject, except given skipKeys.
         * @param sourceObject
         * @param targetObject
         * @param skipKeys
         */
        this.copyKeysFromTo = function (sourceObject, targetObject, skipKeys) {
            _.each(_.keys(sourceObject), function (key) {
                if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                    targetObject[key] = sourceObject[key];
                }
            });
        };
    });
