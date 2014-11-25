/**
 * Directive responsible for switching account forms between them.
 */
angular
    .module("account")
    .directive("accountFormToggle", function (AccountFormToggle, ACCOUNT_FORM_STATE) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.AccountFormToggle = AccountFormToggle;
                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;
            }
        };
    });
