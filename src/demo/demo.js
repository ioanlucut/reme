/**
 * Backend-less demo.
 *
 * Reme's API (api.reme.io) no longer exists. This module plugs AngularJS's own
 * ngMockE2E $httpBackend into the app, so every request is answered in the
 * browser by the fake API in mock-api.js, without changes to the app's code.
 *
 * There is no sign-up or log-in: every way into the app signs the visitor in
 * as a demo user.
 */
(function () {
  'use strict';

  var noop = angular.noop;

  // ---
  // Analytics and support chat were third-party services; keep them silent.
  // ---
  window.mixpanel = {
    init: noop,
    track: noop,
    identify: noop,
    people: { set: noop },
  };

  angular.module('reme').requires.push('remeDemo');

  angular
    .module('remeDemo', ['ngMockE2E'])
    .constant('DEMO_LATENCY_MS', 300)
    .constant('DEMO_USER_EMAIL', 'you@example.com')
    .config(function ($provide) {

      // ---
      // The landing page's "Get started" form enters the app with the typed
      // address instead of sending a verification email. The returned promise
      // stays pending so the button keeps spinning until the app shows.
      // ---
      $provide.decorator('AuthService', function ($delegate, $injector, $q) {
        $delegate.requestSignUpRegistration = function (email) {
          return $delegate
            .login(email, 'demo')
            .then(function () {
              $injector.get('$state').go('reminders.regular');

              return $q.defer().promise;
            });
        };

        return $delegate;
      });

      $provide.decorator('$intercom', function ($delegate) {
        var silent = {};
        angular.forEach($delegate, function (value, key) {
          silent[key] = angular.isFunction(value) ? noop : value;
        });

        return silent;
      });

      // ---
      // Answer after a short delay, as a real server would, so the loading
      // states (spinners, loading bar) still show.
      // ---
      $provide.decorator('$httpBackend', function ($delegate, DEMO_LATENCY_MS) {
        var delayed = function (method, url, data, callback, headers, timeout, withCredentials) {
          var respondLater = function () {
            var args = arguments;
            setTimeout(function () {
              callback.apply(null, args);
            }, url.indexOf('/api/') === 0 ? DEMO_LATENCY_MS : 0);
          };

          return $delegate.call(this, method, url, data, respondLater, headers, timeout, withCredentials);
        };

        angular.extend(delayed, $delegate);

        return delayed;
      });
    })
    .run(function ($rootScope, $state, AuthService, DEMO_USER_EMAIL) {
      var signingIn = false;

      // ---
      // Registered before the app's own AuthFilter, so a signed-out visitor
      // heading for the log-in and sign-up pages, or for a signed-in page such
      // as /reminders, is signed in first and then taken there.
      // ---
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var needsAccount = /^(reminders|settings)/.test(toState.name);
        var entersAccount = toState.name.indexOf('account') === 0;

        if (AuthService.isAuthenticated() || !(needsAccount || entersAccount)) {
          return;
        }

        event.preventDefault();

        if (signingIn) {
          return;
        }

        signingIn = true;
        AuthService
          .login(DEMO_USER_EMAIL, 'demo')
          .then(function () {
            $state.go(needsAccount ? toState.name : 'reminders.regular', needsAccount ? toParams : {});
          })
          .finally(function () {
            signingIn = false;
          });
      });
    })
    .run(function ($document) {
      var banner = angular.element(
        '<div class="reme-demo-banner" role="note">' +
        '<strong>Demo</strong> · no sign-up · try <em>Pay rent tomorrow at 3pm</em>' +
        '</div>'
      );

      banner.css({
        position: 'fixed',
        left: '50%',
        bottom: '12px',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        padding: '6px 14px',
        borderRadius: '16px',
        background: 'rgba(33, 37, 41, 0.85)',
        color: '#fff',
        font: '12px/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif',
        width: 'max-content',
        maxWidth: 'calc(100% - 24px)',
        textAlign: 'center',
        pointerEvents: 'none',
      });

      // Keep the end of every page (the footer) clear of the banner.
      $document.find('body').css('padding-bottom', '48px').append(banner);
    });
})();
