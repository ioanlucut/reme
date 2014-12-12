/**
 * Reminders service which encapsulates the whole logic related to reminders.
 */
angular
    .module("reminders")
    .service("ReminderService", function ($rootScope, $q, $http, $cookies, SessionService, AUTH_EVENTS, REMINDER_URLS) {

        /**
         * Update a reminder.
         * @param reminderToBeCreated
         * @returns {*}
         */
        this.createReminder = function (reminderToBeCreated) {
            return $http
                .post(URLTo.api(REMINDER_URLS.create), reminderToBeCreated)
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update a reminder.
         * @param reminderToBeUpdated
         * @returns {*}
         */
        this.updateReminder = function (reminderToBeUpdated) {
            return $http
                .put(URLTo.api(REMINDER_URLS.update, {":reminderId": reminderToBeUpdated.reminderId}), reminderToBeUpdated)
                .then(function (response) {
                    return response.data;
                });
        };

        /**
         * Delete a reminder.
         * @param reminderToBeDeleted
         * @returns {*}
         */
        this.deleteReminder = function (reminderToBeDeleted) {
            return $http
                .delete(URLTo.api(REMINDER_URLS.delete, {":reminderId": reminderToBeDeleted.reminderId}), reminderToBeDeleted)
                .then(function (response) {
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
                    return response.data;
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };

        /**
         * Get details of a reminder.
         * @param reminderId
         * @returns {*}
         */
        this.getDetails = function (reminderId) {
            return $http
                .get(URLTo.api(REMINDER_URLS.details, {":reminderId": reminderId}))
                .then(function (response) {
                    return response.data;
                });
        };
    });
