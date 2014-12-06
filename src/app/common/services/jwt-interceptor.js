angular
    .module("common")
    .provider('JWTInterceptor', function () {

        this.authHeader = 'Authorization';
        this.authPrefix = 'Bearer ';

        var config = this;

        this.$get = function ($q, $injector, $rootScope, SessionService) {
            return {
                request: function (request) {
                    if ( request.skipAuthorization ) {
                        return request;
                    }

                    request.headers = request.headers || {};
                    // Already has an Authorization header
                    if ( request.headers[config.authHeader] ) {
                        return request;
                    }

                    var tokenPromise = $q.when($injector.invoke(function () {
                        return SessionService.getJwtToken();
                    }, this, {
                        config: request
                    }));

                    return tokenPromise.then(function (token) {
                        if ( token ) {
                            request.headers[config.authHeader] = config.authPrefix + token;
                        }
                        return request;
                    });
                }
            };
        };
    });
