/* Reminder Cache  */

angular
    .module("reminders")
    .service("ReminderCache", ["$cacheFactory", function ($cacheFactory) {

        return $cacheFactory("reminders");
    }]);
