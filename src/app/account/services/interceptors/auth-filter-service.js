/**
 * Authentication service filter used to redirect user to the home page if it is already logged in.
 */
angular
    .module("account")
    .service("AuthFilter", function (AuthService, StatesHandler) {

        return function (event, toState) {
            if ( toState.url === '/account' && AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goHome();
            } else if ( (toState.url === '/profile' || toState.url === '/reminders') && !AuthService.isAuthenticated() ) {

                // Prevent transition
                event.preventDefault();
                StatesHandler.goToLogin();
            }
        };

    });
