/**
 * Reminders constants.
 */
angular
    .module("reminders")
    .constant("REMINDER_URLS", {
        create: "reminders",
        update: "reminders/:reminderId",
        details: "reminders/:reminderId",
        delete: "reminders/:reminderId",
        allReminders: "reminders",
        pastReminders: "reminders/past?:local_time&:local_time_zone",
        upcomingReminders: "reminders/upcoming?:local_time&:local_time_zone"
    });