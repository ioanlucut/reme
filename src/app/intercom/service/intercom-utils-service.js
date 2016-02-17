(function () {
  'use strict';

  angular
    .module('reme.intercom')
    .service('IntercomUtilsService', function ($intercom, AuthService, $rootScope) {

      this.bootIntercom = function (user, args) {

        // ---
        // Bootstrap intercom.
        // ---
        $intercom.boot(_.extend(this.getIntercomUser(user), args || {}));
      };

      this.trackEvent = function (eventName) {
        if (AuthService.isAuthenticated()) {

          $intercom.trackEvent(eventName, {
            email: $rootScope.currentUser.model.email,
            created_at: moment().unix(),
            user_id: '' + $rootScope.currentUser.model.userId,
          });
        } else {
          $intercom.trackEvent(eventName, {
            created_at: moment().unix(),
          });
        }
      };

      this.getIntercomUser = function (user) {
        return {
          email: user.model.email,
          name: user.model.firstName + ' ' + user.model.lastName,
          created_at: moment().unix(),
          user_id: '' + user.model.userId,
        };
      };
    });
}());
