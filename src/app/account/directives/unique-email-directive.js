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
                 * Check whether a string is a valid email address.
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                /**
                 * Check whether an email address is unique.
                 *
                 * @param email
                 * @returns {promise|defer.promise}
                 */
                function isUniqueEmail(email) {

                    // Create deferred
                    var deferred = $q.defer();

                    if ( !isValidEmail(email) ) {
                        deferred.resolve(false);
                    } else {
                        UserService
                            .isUnique(email)

                            .then(function (isUnique) {
                                deferred.resolve(isUnique);
                            });
                    }

                    return deferred.promise;
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidEmail(value) ) {

                        // Set validity
                        isUniqueEmail(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.email == ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueEmail', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    });