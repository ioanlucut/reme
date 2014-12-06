/**
 * Main site module declaration including ui templates.
 */
angular
    .module("reminders", [
        "ui.router"
    ])
    .config(function ($stateProvider) {

        // Home
        $stateProvider

            // Home page
            .state("reminders", {
                url: "/reminders",
                templateUrl: "app/reminders/partials/reminders.html",
                controller: "RemindersCtrl",
                title: "Reminders"
            })
    });
