/* App controller */

angular.module("app").controller("AppCtrl", function ($rootScope, $scope, $state, $cookies, $log, SessionService, AUTH_EVENTS) {

    /**
     * Save the state on root scope
     */
    $rootScope.$state = $state;

    /**
     * On app load, retrieve user profile previously saved (if exists).
     */
    loadUserProfileFromCookie();

    /**
     * Listen to login success event. If user is properly logged in,
     * then retrieve its profile this from cookie used for persistence.
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
        loadUserProfileFromCookie();
    });

    /**
     * Loads user profile from cookie (if exists).
     */
    function loadUserProfileFromCookie() {
        if (SessionService.sessionExists()) {

            $rootScope.userProfile = SessionService.getData();
            $log.log("User profile:", $rootScope.userProfile);
        }
    }

    $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
        SessionService.destroy();
    });
});
