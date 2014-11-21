/**
 * Session service which encapsulates the whole logic account related to the cookie which contains currently logged in user.
 */
angular
    .module("account")
    .service("SessionService", function ($cookies) {

        /**
         * Cookie key for session data.
         *
         * @type {string}
         */
        var cookieDataKey = "auth_session_data";

        /**
         * Create session.
         *
         * @param data
         */
        this.create = function (data) {
            this.setData(data);
        };

        /**
         * Set the session data.
         *
         * @param data
         */
        this.setData = function (data) {
            $cookies[cookieDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($cookies[cookieDataKey]);
        };

        this.sessionExists = function () {
            return $cookies[cookieDataKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $cookies[cookieDataKey];
        };

    });
