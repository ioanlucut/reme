/**
 * Landing page controller.
 */
angular
  .module('remeCommon')
  .controller('LandingPageCtrl', function ($state, $scope, AccountFormToggle, ACCOUNT_FORM_STATE, USER_ACTIVITY_EVENTS) {

    /**
     * Track event.
     */
    $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.landingPageLoaded);

    /**
     * Set default state.
     */
    AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration);
  });
