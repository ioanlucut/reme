/**
 * 404 page controller.
 */
angular
    .module("common")
    .controller("Error404PageCtrl", function (MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.error404);
    });
