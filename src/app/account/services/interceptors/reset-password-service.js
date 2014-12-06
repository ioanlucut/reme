/**
 * Authentication service interceptor used to listen to server responses.
 */
angular
    .module("account")
    .service("ResetPasswordFilter", function () {
        return function (event, toState) {
            if ( toState.url === '/account' ) {

                // Prevent transition
                /*event.preventDefault();*/
            }
        };

    });
