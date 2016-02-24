/**
 * Main app controller declaration.
 */
angular
  .module('reme')
  .controller('AppCtrl', function ($rootScope, $scope, $state, $timeout, $log, AuthService, User, StatesHandler, AUTH_EVENTS, ACTIVITY_INTERCEPTOR, ERROR_INTERCEPTOR, ENV, IntercomUtilsService) {

    var TRACK_EVENT = 'trackEvent';

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

    // ---
    // Bootstrap intercom.
    // ---
    if (AuthService.isAuthenticated()) {
      IntercomUtilsService.bootIntercom($rootScope.currentUser);
    }

    if (!ENV.isProduction) {
      $log.log('Current user: ', $rootScope.currentUser.model);
    }

    /**
     * Listen to login success event. If user is properly logged in,
     * then retrieve its profile this from cookie used for persistence.
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
      $rootScope.currentUser = User.$new().loadFromSession();
      AuthService.redirectToAttemptedUrl();

      // ---
      // Bootstrap intercom.
      // ---
      IntercomUtilsService.bootIntercom($rootScope.currentUser);

      if (!ENV.isProduction) {
        $log.log('Logged in: ', $rootScope.currentUser.model);
      }
    });

    /**
     * Listen to the session timeout event
     */
    $scope.$on(AUTH_EVENTS.sessionTimeout, function () {
      $log.log('Session timed out.');
      AuthService.logout();
    });

    /**
     * Listen to the not authenticated event
     */
    $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
      $log.log('Not authenticated.');

      AuthService.logout();
      AuthService.saveAttemptUrl();
      StatesHandler.goToLogin();
    });

    /**
     * Listen to the logout event
     */
    $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $rootScope.currentUser = User.$new();
      $log.log('Logged out.');
    });

    /**
     * Track events.
     */
    $rootScope.$on(TRACK_EVENT, function (event, args) {
      if (!ENV.isProduction) {
        //return;
      }

      mixpanel.track(args);
      IntercomUtilsService.trackEvent(args);
    });

    /**
     * Track activity - for animation loading bar
     */
    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
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

  });
