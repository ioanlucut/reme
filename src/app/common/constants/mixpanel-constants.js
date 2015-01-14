/**
 * Common mixpanel events.
 */
angular
    .module("common")
    .constant("MIXPANEL_EVENTS", {
        landingPageLoaded: "Landing page loaded",
        signUpRequested: "Signup requested",
        signUpCompleted: "Signup completed",
        remindersPage: "Reminders page (site visited)",
        reminderModalOpened: "Reminder modal opened",
        reminderCreated: "Reminder created",
        reminderUpdated: "Reminder updated",
        reminderDeleted: "Reminder deleted",
        reminderUnSubscribed: "Reminder unsubscribed",
        settings: "Settings",
        error404: "error-404",
        error500: "error-500"
    });