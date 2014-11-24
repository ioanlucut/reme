/**
 * Account form toggle responsible to keep the state of the current displayed account form.
 */
angular
    .module("account")
    .service("AccountFormToggle", function (ACCOUNT_STATE) {
        this.state = ACCOUNT_STATE.login;
        this.previousState = ACCOUNT_STATE.login;

        this.setState = function (state) {
            this.previousState = this.state;
            this.state = state;
        };
    });



