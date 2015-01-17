/**
 * Landing page controller.
 */
angular
    .module("common")
    .controller("LandingPageCtrl", function ($state, $scope, AccountFormToggle, ACCOUNT_FORM_STATE, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.landingPageLoaded);

        /**
         * Set default state.
         */
        AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration);
    });
