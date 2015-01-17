/**
 * Error service interceptor used to listen to ajax server responses.
 */
angular
    .module("common")
    .factory("ErrorInterceptor", function ($rootScope, $q, ERROR_INTERCEPTOR) {

        return {

            /**
             * Response error interceptor.
             *
             * @param response
             * @returns {*}
             */
            responseError: function (response) {

                if ( response.status === 500 && !response.config.cache ) {
                    $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
                }

                return $q.reject(response);
            }
        };

    });
