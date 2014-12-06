/**
 * Common states.
 */
angular
    .module("common")
    .constant("STATES", {
        home: "home",
        profile: "profile",
        reminders: "reminders",
        account: "account"
    })
    .constant("ACCESS_LEVEL", {
        forLoggedUser: "forLoggedUser",
        forGuestUser: "forGuestUser"
    });
