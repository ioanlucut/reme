/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", function ($rootScope, $q, $http, $cookies, SessionService, AUTH_EVENTS, AUTH_URLS) {

        /**
         * Login functionality
         *
         * @param email
         * @param password
         * @returns {*}
         */
        this.login = function (email, password) {

            return $http.post(URLTo.api(AUTH_URLS.login), {
                email: email,
                password: password
            }).then(function (response) {

                SessionService.create(response.data);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

                return response;
            }).catch(function (response) {

                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

                return response;
            });
        };

        /**
         * Logout functionality
         *
         * @returns {*}
         */
        this.logout = function () {
            return $http.post(URLTo.api(AUTH_URLS.logout), {}).then(function () {
                SessionService.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            });
        };

        /**
         * Is User already authenticated ?
         * @returns {*}
         */
        this.isAuthenticated = function () {
            return SessionService.sessionExists();
        };

        /**
         * Request password reset functionality
         * @param email
         * @returns {*}
         */
        this.requestPasswordReset = function (email) {
            return $http.post(URLTo.api(AUTH_URLS.requestPasswordReset), {
                email: email
            });
        };

        /**
         * Validate password reset token.
         *
         * @param token
         * @returns {*}
         */
        this.validatePasswordResetToken = function (token) {
            return $http
                .post(URLTo.api(AUTH_URLS.validatePasswordResetToken), {
                    token: token
                })
                .then(function (response) {
                    return response.data.email;
                });

        };

        /**
         * Reset password with token.
         *
         * @param email
         * @param password
         * @param passwordConfirm
         * @returns {*}
         */
        this.resetPasswordWithToken = function (email, password, passwordConfirm) {
            return $http
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken), {
                    email: email,
                    password: password,
                    passwordConfirm: passwordConfirm
                })
                .then(function (response) {
                    return response.data;
                });
        };
    });
