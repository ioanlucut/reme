angular
  .module('remeCommon')
  .directive('mixpanelInitializer', function ($window, ENV) {
    return {
      restrict: 'A',
      compile: function compile() {
        return {
          pre: function preLink() {
            var mixpanel = $window.mixpanel || {};
            mixpanel.init(ENV.mixPanelId);
          },
        };
      },
    };
  });
