/**
 * Created by ilucut on 11/15/14.
 */

angular.module("account").controller("LogoutCtrl", function ($state, LoginService) {

    LoginService.logout()
        .then(function () {
            $state.go("home");
        });
});
