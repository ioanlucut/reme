/**
 * Created by ilucut on 11/15/14.
 */

angular.module("account").controller("LoginCtrl", function ($scope, LoginService, AUTH_EVENTS) {

    $scope.authError = false;

    $scope.login = function (name, password) {

        LoginService.login(name, password)

            // Then
            .then(function (response) {
                console.log(response);

                $scope.authError = false;
            })

            //catch
            .catch(function (response) {
                console.log(response);

                $scope.authError = true;
            });
    }
});
