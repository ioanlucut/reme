/* Mixpanel */

angular
    .module("common")
    .factory("mixpanel", [function () {

        return window.mixpanel;

    }]);
