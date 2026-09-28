/**
 * Backend-less demo.
 *
 * Reme's API (api.reme.io) no longer exists. This module plugs AngularJS's own
 * ngMockE2E $httpBackend into the app, so every request is answered in the
 * browser by the fake API in mock-api.js. The app code itself is unchanged.
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
    .config(function ($provide) {

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
    .run(function ($document) {
      var banner = angular.element(
        '<div class="reme-demo-banner" role="note">' +
        '<strong>Demo</strong> · runs entirely in your browser · log in with any email and password' +
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

      $document.find('body').append(banner);
    });
})();
