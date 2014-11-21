/**
 * Home controller.
 */
angular
    .module("site")
    .controller("HomeCtrl", function ($scope, helloMessage) {
        $scope.helloMessage = helloMessage;
    });