/* Header directive */

angular.module("common").directive("header", function () {
    return {
        restrict: "A",
        templateUrl: "app/common/partials/header.html",
        link: function (scope, el) {

        }
    };
});
