/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("account")
    .service("AuthFilter", function (AuthService, StatesHandler) {

        return function (event, toState) {
            if ( (toState.url === '/account' || toState.name === "home") && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToReminders();
            } else if ( (toState.url.indexOf("/settings") > -1 || toState.url.indexOf("/reminders") > -1) && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                AuthService.saveAttemptUrl();
                StatesHandler.goToLogin();
            }
        };

    });