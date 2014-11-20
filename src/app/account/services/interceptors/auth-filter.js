angular.module("account").service("AuthFilter", function ($state, SessionService, STATES) {

    return function (event, toState) {
        if (toState.url === '/account/login' && SessionService.sessionExists()) {

            // Prevent transition
            event.preventDefault();

            // Go to the home state
            $state.go(STATES.home);
        }
    };

});
