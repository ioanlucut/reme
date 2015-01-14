/**
 * Common states.
 */
angular
    .module("common")
    .constant("ACTIVITY_INTERCEPTOR", {
        activityStart: "activity-interceptor-start",
        activityEnd: "activity-interceptor-end"
    })
    .constant("STATES", {
        home: "home",
        profile: "profile",
        reminders: "reminders.regular",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    })
    .constant("ERROR_INTERCEPTOR", {
        status500: "status500"
    });
