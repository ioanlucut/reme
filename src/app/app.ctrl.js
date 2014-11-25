/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", function (AUTH_EVENTS, $rootScope, $scope, $state, $log, AuthService, User, StatesHandler) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * On app load, retrieve user profile previously saved (if exists).
         */
        $rootScope.currentUser = User.$new().loadFromSession();
        $log.log("Current user: ", $rootScope.currentUser);

        /**
         * Listen to login success event. If user is properly logged in,
         * then retrieve its profile this from cookie used for persistence.
         */
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $rootScope.currentUser = User.$new().loadFromSession();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        // Listen to the session timeout event
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        // Listen to the not authenticated event
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");
            AuthService.logout();
        });

        // Listen to the logout event
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
            StatesHandler.goHome();
        });
    });
