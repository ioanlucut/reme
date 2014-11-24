angular
    .module("common")
    .service("StatesHandler", function ($state, STATES) {

        this.goHome = function () {
            this.go(STATES.home);
        };

        this.go = function (state) {
            $state.go(state);
        }
    });