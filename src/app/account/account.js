/**
 * Main account module declaration including ui templates.
 */
angular
  .module('remeAccount', [
    'ui.router',
    'restmod',
    'remeCommon',
  ])
  .config(function ($stateProvider, $httpProvider) {

    // Register AuthInterceptor
    $httpProvider.interceptors.push('AuthInterceptor');

    // Home
    $stateProvider

    // Login page
      .state('account', {
        url: '/account',
        controller: 'LoginCtrl',
        templateUrl: '/app/account/partials/account.html',
        title: 'Login - Reme.io',
      })

      // Settings page
      .state('settings', {
        url: '/account/settings',
        views: {

          '': { templateUrl: '/app/account/partials/settings/settings.html' },

          'profile@settings': {
            templateUrl: '/app/account/partials/settings/settingsProfile.html',
          },

          'preferences@settings': {
            templateUrl: '/app/account/partials/settings/settingsPreferences.html',
          },
        },
        title: 'Settings - Reme.io',
      })

      // Logout page
      .state('account:logout', {
        url: '/account/logout',
        controller: 'LogoutCtrl',
        templateUrl: '/app/account/partials/logout.html',
        resolve: {
          isSuccessfullyLoggedOut: function ($q, AuthService) {
            AuthService.logout();

            return true;
          },
        },
        title: 'Logout - Reme.io',
      })

      ///////////////////////////////////////////////
      /*Validate password reset token related views*/

      ///////////////////////////////////////////////

      // Validate password reset token abstract view
      .state({
        name: 'account:validatePasswordResetToken',
        url: '/account/reset-password',
        templateUrl: '/app/account/partials/validatePasswordResetTokenAbstract.html',
        abstract: true,
      })

      // Validate password reset token - valid
      .state({
        name: 'account:validatePasswordResetToken.valid',
        url: '/{email}/{token}',
        templateUrl: '/app/account/partials/validatePasswordResetTokenValid.html',
        controller: 'ValidatePasswordResetTokenCtrl',
        resolve: {
          validateTokenResult: function ($stateParams, $q, AuthService, $state) {
            var deferred = $q.defer();

            AuthService.validatePasswordResetToken($stateParams.email, $stateParams.token)
              .then(function (response) {
                deferred.resolve({ email: $stateParams.email, token: $stateParams.token });
                return response;
              })
              .catch(function (response) {

                $state.go('account:validatePasswordResetToken.invalid');
                return response;
              });

            return deferred.promise;
          },
        },
        title: 'Reset password - Reme.io',
      })

      // Validate password reset token - invalid token
      .state({
        name: 'account:validatePasswordResetToken.invalid',
        url: '/invalid-token',
        templateUrl: '/app/account/partials/validatePasswordResetTokenInvalid.html',
        controller: 'ValidatePasswordResetTokenInvalidCtrl',
        title: 'Reset password - Reme.io',
      })

      /////////////////////////
      /*Sign up related views*/

      /////////////////////////

      // Sign up confirm abstract view
      .state({
        name: 'account:confirmRegistration',
        url: '/account/confirm-registration',
        templateUrl: '/app/account/partials/signupConfirmAbstract.html',
        abstract: true,
      })

      // Sign up confirm - valid
      .state({
        name: 'account:confirmRegistration.valid',
        url: '/{email}/{token}',
        templateUrl: '/app/account/partials/signupConfirmValid.html',
        controller: 'SignUpConfirmCtrl',
        resolve: {
          validateRegistrationResult: function ($stateParams, $q, AuthService, $state) {
            var deferred = $q.defer();

            AuthService.validateRegistrationToken($stateParams.email, $stateParams.token)
              .then(function (response) {
                deferred.resolve({
                  email: $stateParams.email,
                  token: $stateParams.token,
                });
                return response;
              })
              .catch(function (response) {
                $state.go('account:confirmRegistration.invalid');
                return response;
              });

            return deferred.promise;
          },
        },
        title: 'Register - Reme.io',
      })

      // Sign up confirm - invalid
      .state({
        name: 'account:confirmRegistration.invalid',
        url: '/registration-failed',
        templateUrl: '/app/account/partials/signupConfirmInvalid.html',
        controller: 'SignUpConfirmInvalidCtrl',
        title: 'Register - Reme.io',
      });
  })

  .run(function ($rootScope, AuthFilter) {

    // Setup route filters
    $rootScope.$on('$stateChangeStart', AuthFilter);

  });
