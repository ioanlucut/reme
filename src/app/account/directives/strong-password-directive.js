/**
 * Directive responsible for checking of a password is strong enough.
 */
angular
    .module("account")
    .directive("strongPassword", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a password is strong enough.
                 *
                 * @param password
                 * @returns {boolean}
                 */
                function isStrongPassword(password) {
                    return !!password && password.length >= 7;
                }

                // Add parser
                ngModel.$parsers.unshift(function (value) {
                    var isValid = isStrongPassword(value);
                    ngModel.$setValidity('strongPassword', isValid);
                    return isValid ? value : undefined;
                });
            }
        };
    });
