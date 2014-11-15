/* App controller */

angular.module("app").controller("AppCtrl", function($rootScope, $scope, $state) {

    // Save the state on root scope
    $rootScope.$state = $state;
});
