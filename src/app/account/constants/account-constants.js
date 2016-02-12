/**
 * Account related constants.
 */
angular
    .module('account')
    .constant('AUTH_EVENTS', {
      isLoggedIn: 'auth-is-logged-in',
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized',
    })
    .constant('AUTH_URLS', {
      login: 'auth/login',
      logout: 'auth/logout',
      currentUser: 'auth/user',
      auth: 'accounts',
      create: 'accounts/create/:email/:token',
      update: 'accounts/update',
      details: 'accounts/details',
      requestPasswordReset: 'accounts/request_password_reset_token',
      requestSignUpRegistration: 'accounts/send_email_verification_token',
      validatePasswordResetToken: 'accounts/validate_password_reset_token/:email/:token',
      validateRegistrationToken: 'accounts/validate_email_verification_token/:email/:token',
      updatePassword: 'accounts/update_password',
      resetPasswordWithToken: 'accounts/reset_password_with_token/:email/:token',
      refreshToken: 'auth/refresh_token',
    })
    .constant('ACCOUNT_FORM_STATE', {
      login: 'login',
      logout: 'logout',
      signUp: 'signUp',
      signUpSuccessfully: 'signUpSuccessfully',
      forgotPassword: 'forgotPassword',
      forgotPasswordEmailSent: 'forgotPasswordEmailSent',
      requestSignUpRegistration: 'requestSignUpRegistration',
      requestSignUpRegistrationEmailSent: 'requestSignUpRegistrationEmailSent',
      updateProfile: 'updateProfile',
      resetPassword: 'resetPassword',
      resetPasswordSuccessfully: 'resetPasswordSuccessfully',
      updatePassword: 'updatePassword',
      updatePasswordSuccessfully: 'updatePasswordSuccessfully',
    })
    .constant('AUTH_TOKEN_HEADER', 'authtoken');
