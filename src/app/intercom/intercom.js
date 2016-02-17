(function () {
  'use strict';

  angular
    .module('reme.intercom', [
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
