/**
 * Session service which encapsulates the whole logic account related to the Local storage which contains currently logged in user.
 */
angular
    .module("common")
    .service("SessionService", function ($localStorage, CamelCaseTransform) {

        /**
         * Local storage key for session data.
         *
         * @type {string}
         */
        var sessionDataKey = "auth_session_data";
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

            $localStorage[sessionDataKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getData = function () {
            return angular.fromJson($localStorage[sessionDataKey]);
        };

        /**
         * Set the token data.
         *
         * @param data
         */
        this.setJwtToken = function (data) {
            $localStorage[jwtTokenKey] = angular.toJson(data);
        };

        /**
         * Return the session data.
         */
        this.getJwtToken = function () {
            return angular.fromJson($localStorage[jwtTokenKey]);
        };

        this.sessionExists = function () {
            return $localStorage[sessionDataKey] && $localStorage[jwtTokenKey];
        };

        /**
         * Destroy session.
         */
        this.destroy = function () {
            delete $localStorage[sessionDataKey];
            delete $localStorage[jwtTokenKey];
        };

    });
