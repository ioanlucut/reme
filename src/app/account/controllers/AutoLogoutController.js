(function () {
  'use strict';

  /**
   * Logout controller responsible for user logout action.
   */
  angular
    .module('remeAccount')
    .controller('LogoutController', function ($scope, $timeout, StatesHandler, AuthService) {

      var vm = this;

      vm.logOut = function () {
        $timeout(function () {
          AuthService.logout();
          StatesHandler.goHome();
        });
      };

    });
}());
