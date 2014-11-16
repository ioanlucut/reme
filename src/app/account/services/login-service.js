/**
 * Created by ilucut on 11/15/14.
 */

angular.module("account").service("LoginService", function ($q) {

    return {
        login: function (name, password) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.reject(true);
            }, 2000);

            return deferred.promise;
        },

        logout: function (name, password) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.reject(true);
            }, 2000);

            return deferred.promise;
        }
    }
});
