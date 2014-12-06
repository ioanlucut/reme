/**
 * Session service which encapsulates the whole logic account related to the cookie which contains currently logged in user.
 */
angular
    .module("common")
    .service("SessionService", function ($cookies, CamelCaseTransform) {

        /**
         * Cookie key for session data.
         *
         * @type {string}
         */
        var cookieDataKey = "auth_session_data";
        var jwtTokenKey = "auth_jwt_token";

        /**
         * Create session.
         *
         * @param data
         */
        this.create = function (data, jwtToken) {
            this.setData(data);
            this.setJwtToken(jwtToken);
        };

        /**
         * Set the session data.
         *
         * @param data
         */
        this.setData = function (data) {
            CamelCaseTransform.transform(data, CamelCaseTransform.TRANSFORMATION_TYPE.CAMELIZE);

            $cookies[cookieDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($cookies[cookieDataKey]);
        };

        /**
         * Set the token data.
         *
         * @param data
         */
        this.setJwtToken = function (data) {
            $cookies[jwtTokenKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getJwtToken = function () {
            return angular.fromJson($cookies[jwtTokenKey]);
        };

        this.sessionExists = function () {
            return $cookies[cookieDataKey] && $cookies[jwtTokenKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $cookies[cookieDataKey];
            delete $cookies[jwtTokenKey];
        };

    });
