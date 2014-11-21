/**
 * Authentication service which encapsulates the whole logic account related of a user.
 */
angular
    .module("account")
    .service("AuthService", function ($rootScope, $q, $cookies, AUTH_EVENTS, SessionService) {

        /**
         * Login functionality
         *
         * @param name
         * @param password
         * @returns {*}
         */
        this.login = function (name, password) {
            var deferred = $q.defer();

            setTimeout(function () {
                if ( name === 'ilu@ilu.ilu' && password === 'ilu' ) {

                    SessionService.create({
                        name: name,
                        town: 'Vienna',
                        postalCode: '1040'
                    });

                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, 'Welcome' + name);

                    deferred.resolve('Welcome' + name);
                }
                else {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, 'Error');

                    deferred.reject('Username and password is wrong.');
                }
            }, 2000);

            return deferred.promise;
        };

        /**
         * Logout functionality
         *
         * @param name
         * @param password
         * @returns {*}
         */
        this.logout = function (name, password) {
            var deferred = $q.defer();

            setTimeout(function () {
                SessionService.destroy();

                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, 'Logout success');

                deferred.resolve('Logged out.');
            }, 2000);

            return deferred.promise;
        };

        /**
         * Is User already authenticated ?
         * @returns {*}
         */
        this.isAuthenticated = function () {
            return SessionService.isEmpty();
        }

    });
