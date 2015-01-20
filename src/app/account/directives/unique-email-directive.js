angular
    .module("account")
    .directive("uniqueEmail", function ($q, $timeout, UserService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether an email address is unique.
                 *
                 * @param email
                 * @returns {promise|defer.promise}
                 */
                ngModel.$asyncValidators.uniqueEmail = function (email) {
                    var deferred = $q.defer();

                    UserService
                        .isUnique(email)
                        .then(function (response) {
                            if ( !response.isUnique ) {
                                deferred.reject();
                            }
                            else {
                                deferred.resolve(response.isUnique);
                            }
                        });

                    return deferred.promise;

                };
            }
        };
    });
