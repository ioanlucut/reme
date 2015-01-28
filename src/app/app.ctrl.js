/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", function ($rootScope, $scope, $state, $timeout, $log, AuthService, User, StatesHandler, AUTH_EVENTS, ACTIVITY_INTERCEPTOR, ERROR_INTERCEPTOR, ENV) {

        /**
         * Save the state on root scope
         */
        $rootScope.$state = $state;

        /**
         * Environment
         */
        $rootScope.ENV = ENV;

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
            AuthService.redirectToAttemptedUrl();
            $log.log("Logged in: ", $rootScope.currentUser);
        });

        /**
         * Listen to the session timeout event
         */
        $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
            $log.log("Session timed out.");
            AuthService.logout();
        });

        /**
         * Listen to the not authenticated event
         */
        $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $log.log("Not authenticated.");

            AuthService.logout();
            AuthService.saveAttemptUrl();
            StatesHandler.goToLogin();
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });

        /**
         * Track activity - for animation loading bar
         */
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
        });

        /**
         * Interceptor - always go to reminders page if logged in.
         */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);

            if ( toState.name === "home" && toParams.redirect !== "false" && AuthService.isAuthenticated() ) {

                event.preventDefault();
                StatesHandler.goToReminders();
            }
        });

        $rootScope.$on('$viewContentLoaded', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
        });

        /**
         * Listen to the logout event
         */
        $scope.$on(ERROR_INTERCEPTOR.status500, function () {
            $state.go('500');
        });

        /**
         * Development debug listeners
         */
        if ( ENV.name === "development" ) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $log.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
                $log.log('$stateChangeError - fired when an error occurs during transition.');
                $log.log(arguments);
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $log.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
            });
            $rootScope.$on('$viewContentLoaded', function (event) {
                $log.log('$viewContentLoaded - fired after dom rendered', event);
            });
            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                $log.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
                $log.log(unfoundState, fromState, fromParams);
            });
        }
    });
