/* Activity interceptor */

angular.
    module("common").
    factory("ActivityInterceptor", function ($rootScope, $q, ACTIVITY_INTERCEPTOR) {
        return {

            /**
             * Request interceptor.
             *
             * @param config
             * @returns {*}
             */
            request: function (config) {
                if ( !config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityStart);
                }
                return config;
            },

            /**
             * Response interceptor.
             *
             * @param response
             * @returns {Promise}
             */

            response: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return response;
            },

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {Promise}
             */
            responseError: function (response) {
                if ( !response.config.cache ) {
                    $rootScope.$broadcast(ACTIVITY_INTERCEPTOR.activityEnd);
                }
                return $q.reject(response);
            }
        };
    });
