/**
 * Main app module declaration.
 */
angular
  .module('reme', [
    'config',
    'ngAnimate',
    'ngMessages',
    'ui.router',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'ngStorage',
    'site',
    'feedback',
    'common',
    'reminders',
    'account',
    'angular.filter',
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
