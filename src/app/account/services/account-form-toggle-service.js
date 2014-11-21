/**
 * Sign up controller responsible for user sign up action.
 */
angular.module("account").service("AccountFormToggle", function (ACCOUNT_STATE) {
    this.state = ACCOUNT_STATE.login;

    this.setState = function (state) {
        this.state = state;
    };
});



