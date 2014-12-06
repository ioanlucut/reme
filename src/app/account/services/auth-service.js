/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", function ($rootScope, $q, $http, $cookies, SessionService, AUTH_EVENTS, AUTH_URLS, AUTH_TOKEN_HEADER) {

        /**
         * Is User already authenticated ?
         * @returns {*}
         */
        this.isAuthenticated = function () {
            return SessionService.sessionExists();
        };

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

                SessionService.create(response.data, response.headers()[AUTH_TOKEN_HEADER]);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response);

                return response;
            }).catch(function (response) {

                SessionService.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);

                return $q.reject(response);
            });
        };

        /**
         * Logout functionality
         *
         * @returns {*}
         */
        this.logout = function () {
            var defer = $q.defer();

            SessionService.destroy();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            defer.resolve();

            return defer.promise;
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
         * Reset password with token.
         *
         * @param email
         * @param password
         * @param passwordConfirmation
         * @param token
         * @returns {*}
         */
        this.resetPasswordWithToken = function (email, password, passwordConfirmation, token) {
            return $http
                .post(URLTo.api(AUTH_URLS.resetPasswordWithToken, {":token": token}),
                {
                    email: email,
                    password: password,
                    passwordConfirmation: passwordConfirmation
                },
                {
                    skipAuthorization: true
                })
                .then(function (response) {
                    return response.data;
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
                .get(URLTo.api(AUTH_URLS.validatePasswordResetToken, {":token": token}),
                {
                    skipAuthorization: true
                }).then(function (response) {
                    return response.data;
                });
        };

        /**
         * Update password.
         *
         * @param oldPassword
         * @param newPassword
         * @param newPasswordConfirmation
         * @returns {*}
         */
        this.updatePassword = function (oldPassword, newPassword, newPasswordConfirmation) {
            return $http
                .post(URLTo.api(AUTH_URLS.updatePassword),
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    newPasswordConfirmation: newPasswordConfirmation
                }).then(function (response) {
                    return response.data;
                });
        };

        this.updateAccount = function (account) {
            return $http.post(URLTo.api(AUTH_URLS.update), account);
        };

        this.createAccount = function (account) {
            return $http.post(URLTo.api(AUTH_URLS.create), account);
        };
    });
