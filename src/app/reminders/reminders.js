/
dsad
@dsa.dsa * *
* Main
site
module
declaration
including
ui
templates.
    * /
angular
    .module("reminders", [
        "ui.router",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.tooltip",
        "ui.bootstrap.popover",
        "ui.bootstrap.modal",
        "common",
        "feedback"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            // Home page
            .state("reminders", {
                url: "/reminders",
                templateUrl: "app/reminders/partials/reminders.html",
                controller: "RemindersCtrl",
                title: "Reminders"
            })

            // Reminder create
            .state("create", {
                url: "/create",
                templateUrl: "app/reminders/partials/reminder/create.html",
                abstract: true
            })

            // Reminder create form
            .state("create.form", {
                url: "", // See http://stackoverflow.com/a/17004670/240324
                templateUrl: "app/reminders/partials/reminder/form.html",
                resolve: {
                    reminder: ["$window", "Reminder", "jstz", function ($window, Reminder, jstz) {

                        // Make the reminder due the next hour
                        var defaultDueOn = Date.create().addHours(1).set({minute: 0, second: 0});

                        return new Reminder({
                            text: "",
                            due_on: defaultDueOn,
                            created_by: $window.localStorage.reminderCreatedBy || "",
                            additional_addressees: [],
                            timezone: jstz.determine().name()
                        });
                    }]
                },
                controller: "ReminderFormCtrl",
                title: "Create email reminders in seconds - Reme.IO"
            }).

            // Reminder update
            state("update", {
                url: "/reminders/:secureId/update",
                templateUrl: "app/reminders/partials/reminder/update.html",
                abstract: true
            }).

            // Reminder update form
            state("update.form", {
                url: "",
                templateUrl: "app/reminders/partials/reminder/form.html",
                resolve: {
                    reminder: ["$location", "$stateParams", "$q", "Reminder", "ReminderCache", function ($location, $stateParams, $q, Reminder, ReminderCache) {

                        var deferred = $q.defer();
                        Reminder.find($stateParams["secureId"]).

                            then(function (reminder) {
                                ReminderCache.put(reminder.attr("secure_id"), reminder);
                                deferred.resolve(reminder);
                            }).

                            catch(function () {
                                $location.path("/");
                            });

                        return deferred.promise;
                    }]
                },
                controller: "ReminderFormCtrl",
                title: "Update your reminder  - Reme.IO"
            }).

            // Reminder created
            state("saved", {
                url: "/reminders/:secureId/saved",
                templateUrl: "app/reminders/partials/saved.html",
                resolve: {
                    reminder: ["$location", "$stateParams", "ReminderCache", function ($location, $stateParams, ReminderCache) {

                        var reminder = ReminderCache.get($stateParams["secureId"]);
                        if ( !reminder ) {
                            $location.path("/");
                        }

                        return reminder;
                    }]
                },
                controller: "ReminderSavedCtrl",
                title: "Reminder saved - Reme.IO"
            }).

            // Privacy policy
            state("privacy", {
                url: "/privacy",
                templateUrl: "app/reminders/partials/privacy.html",
                title: "Privacy Policy - Reme.IO"
            });

    }]);
