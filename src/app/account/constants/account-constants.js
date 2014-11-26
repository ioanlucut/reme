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
        requestPasswordReset: "accounts/requestPasswordReset",
        validatePasswordResetToken: "accounts/validatePasswordResetToken",
        resetPasswordWithToken: "accounts/resetPasswordWithToken"
    })
    .constant("ACCOUNT_FORM_STATE", {
        login: "login",
        logout: "logout",
        signUp: "signUp",
        updateProfile: "updateProfile",
        forgotPassword: "forgotPassword",
        forgotPasswordEmailSent: "forgotPasswordEmailSent"
    });
