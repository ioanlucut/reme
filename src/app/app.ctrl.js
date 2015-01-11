/**
 * Main app controller declaration.
 */
angular
    .module("app")
    .controller("AppCtrl", function (AUTH_EVENTS, $rootScope, $scope, $state, $timeout, $log, AuthService, User, StatesHandler, ACTIVITY_INTERCEPTOR) {

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
            StatesHandler.goToLogin();
        });

        // Listen to the logout event
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = User.$new();
            $log.log("Logged out.");
        });

        /*Track activity*/
        $rootScope.$on('$stateChangeStart', function () {
            $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
        });
        $rootScope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
            }, 2000);
        });

        // DEVELOPMENT DEBUG
        if ( URLTo.apiBase() !== "http://reme-api.reme.io" ) {
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
