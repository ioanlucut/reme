/**
 * Main app module declaration.
 */
angular
  .module('reme', [
    'config',
    'ui.router',
    'ngStorage',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'ngAnimate',
    'ngMessages',
    'angular.filter',
    'reme.intercom',
    'reme.site',
    'reme.common',
    'reme.reminders',
    'reme.account',
  ])
  .config(function ($locationProvider) {

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false,
      })
      .hashPrefix('!');
  })
  .run(function (ENV) {

    URLTo.apiBase(ENV.apiEndpoint);
  });
