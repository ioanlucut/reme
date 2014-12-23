/**
 * Account related constants.
 */
angular
    .module("account")
    .constant("AUTH_EVENTS", {
        isLoggedIn: "auth-is-logged-in",
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized"
    })
    .constant("AUTH_URLS", {
        login: "auth/login",
        logout: "auth/logout",
        currentUser: "auth/user",
        auth: "accounts",
        create: "accounts/create",
        update: "accounts/update",
        details: "accounts/details",
        requestPasswordReset: "accounts/request_password_reset_token",
        requestRegistration: "accounts/request_registration",
        validatePasswordResetToken: "accounts/validate_password_reset_token/:token",
        validateRegistrationToken: "accounts/validate_registration_token/:token",
        updatePassword: "accounts/update_password",
        resetPasswordWithToken: "accounts/reset_password_with_token/:token",
        refreshToken: "auth/refresh_token"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        signUpSuccessfully: "signUpSuccessfully",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent",
        requestRegistration: "requestRegistration",
        requestRegistrationEmailSent: "requestRegistrationEmailSent",
        updateProfile: "updateProfile",
        resetPassword: "resetPassword",
        resetPasswordSuccessfully: "resetPasswordSuccessfully",
        updatePassword: "updatePassword",
        updatePasswordSuccessfully: "updatePasswordSuccessfully"
    })
    .constant("AUTH_TOKEN_HEADER", "authtoken");
