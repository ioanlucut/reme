angular
    .module("common")
    .service("StatesHandler", function ($state, STATES) {

        this.goHome = function () {
            this.go(STATES.home);
        };

        this.goToProfile = function () {
            this.go(STATES.profile);
        };

        this.goToReminders = function () {
            this.go(STATES.reminders);
        };

        this.go = function (state) {
            $state.go(state);
        }
    });