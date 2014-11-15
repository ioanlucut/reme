/**
 * Created by ilucut on 11/15/14.
 */

angular.module("account")
    .constant("AUTH_EVENTS", {
        loginSuccess:               "auth-login-success",
        loginFailed:                "auth-login-failed",
        logoutSuccess:              "auth-logout-success",
        sessionTimeout:             "auth-session-timeout",
        notAuthenticated:           "auth-not-authenticated",
        notAuthorized:              "auth-not-authorized"
    });
