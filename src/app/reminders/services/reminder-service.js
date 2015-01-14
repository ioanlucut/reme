/**
 * Reminders service which encapsulates the whole logic related to reminders.
 */
angular
    .module("reminders")
    .service("ReminderService", function (REMINDER_URLS, $q, $http, $injector, ReminderGroupService, ReminderTransformerService) {

        /**
         * Update a reminder.
         * @param reminder
         * @returns {*}
         */
        this.createReminder = function (reminder) {
            return $http
                .post(URLTo.api(REMINDER_URLS.create), ReminderTransformerService.toReminderDto(reminder))
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

                    return response;
                });
        };

        /**
         * Update a reminder.
         * @param reminder
         * @returns {*}
         */
        this.updateReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .put(URLTo.api(REMINDER_URLS.update, { ":reminderId": reminderDto.reminderId }), reminderDto)
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

                    return response;
                });
        };

        /**
         * UnSubscribe from a reminder.
         * @param reminder
         * @returns {*}
         */
        this.unSubscribeFromReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .post(URLTo.api(REMINDER_URLS.unSubscribeReminder, { ":reminderId": reminderDto.reminderId }), reminderDto);
        };

        /**
         * Delete a reminder.
         * @param reminder
         * @returns {*}
         */
        this.deleteReminder = function (reminder) {
            var reminderDto = ReminderTransformerService.toReminderDto(reminder);

            return $http
                .delete(URLTo.api(REMINDER_URLS.delete, { ":reminderId": reminderDto.reminderId }), reminderDto)
                .then(function (response) {
                    ReminderTransformerService.toReminder(response.data, reminder);

                    return response.data;
                });
        };

        /**
         * Get all reminders of current user
         * @returns {*}
         */
        this.getAllReminders = function () {
            return $http
                .get(URLTo.api(REMINDER_URLS.allReminders))
                .then(function (response) {

                    return ReminderTransformerService.toReminders(response.data)
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Gets all reminders grouped by upcoming and past reminders.
         * @returns {*}
         */
        this.getAllRemindersGrouped = function () {
            var deferred = $q.defer();

            this
                .getAllReminders()
                .then(function (response) {
                    deferred.resolve(ReminderGroupService.getPastAndUpcomingReminders(response));
                }).catch(function () {
                    deferred.resolve(ReminderGroupService.getPastAndUpcomingReminders([]));
                });

            return deferred.promise;
        };

        /**
         * Get details of a reminder.
         * @param reminderId
         * @returns {*}
         */
        this.getDetails = function (reminderId) {
            return $http
                .get(URLTo.api(REMINDER_URLS.details, { ":reminderId": reminderId }))
                .then(function (response) {
                    return ReminderTransformerService.toReminder(response.data, $injector.get('Reminder').build());
                });
        };
    });
