angular
    .module("common")
    .service("JWTTokenRefresher", function ($injector, JWTHelper, SessionService) {

        this.refreshTokenIfExpired = function () {
            if ( this.isTokenExpired() ) {
                this.refreshToken();
            }
        };

        this.isTokenExpired = function () {
            return JWTHelper.isTokenExpired(SessionService.getJwtToken());
        };

        this.refreshToken = function () {
            return $injector.get('AuthService').refreshToken();
        };
    });
