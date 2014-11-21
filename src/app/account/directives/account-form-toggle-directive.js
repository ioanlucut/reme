/**
 * Directive responsible for switching account forms between them.
 */
angular
    .module("account")
    .directive("accountFormToggle", function (AccountFormToggle, ACCOUNT_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.AccountFormToggle = AccountFormToggle;
                scope.ACCOUNT_STATE = ACCOUNT_STATE;
            }
        };
    });
