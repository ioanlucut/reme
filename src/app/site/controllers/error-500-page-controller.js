/**
 * 500 page controller.
 */
angular
    .module("common")
    .controller("Error500PageCtrl", function (MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.error500);
    });
