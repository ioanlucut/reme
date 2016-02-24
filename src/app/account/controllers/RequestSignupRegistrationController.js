/**
 * Request registration controller responsible for first sign up action on the home page, having only the email.
 */
angular
  .module('remeAccount')
  .controller('RequestSignUpRegistrationCtrl', function ($scope, AuthService, ACCOUNT_FORM_STATE, AccountFormToggle, USER_ACTIVITY_EVENTS) {

    /**
     * Request registration up user information.
     */
    $scope.requestSignUpRegistrationData = {
      email: '',
    };

    /**
     * Request registration functionality.
     */
    $scope.requestSignUpRegistration = function () {

      if ($scope.requestSignUpRegistrationForm.$valid) {

        // Show the loading bar
        $scope.isRequestPending = true;

        AuthService
          .requestSignUpRegistration($scope.requestSignUpRegistrationData.email)
          .then(function () {
            $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.signUpRequested);
            AccountFormToggle.setState(ACCOUNT_FORM_STATE.requestSignUpRegistrationEmailSent);
          })
          .finally(function () {
            // Stop the loading bar
            $scope.isRequestPending = false;
          });
      }
    };
  });
