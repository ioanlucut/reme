(function () {
  'use strict';

  angular
    .module('remeIntercom', [
      'ngIntercom',
      'config',
    ])
    .config(function ($intercomProvider, ENV) {
      $intercomProvider
        .appID(ENV.intercomAppId);
      $intercomProvider
        .asyncLoading(true);
    });
}());
