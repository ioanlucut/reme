/**
 * Header directive responsible for header common template.
 */
angular
    .module("common")
    .directive("header", function ($rootScope) {
        return {
            restrict: "A",
            templateUrl: "app/common/partials/header.html",
            link: function (scope, el) {

                /**
                 * Reference to the current user.
                 * @type {$rootScope.currentUser|*}
                 */
                scope.currentUser = $rootScope.currentUser;
            }
        };
    });
