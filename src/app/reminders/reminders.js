/**
 * Main site module declaration including ui templates.
 */
angular
    .module("reminders", [
        "ui.router",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "ui.bootstrap.tabs",
        "angular-ladda",
        "common"
    ])
    .config(["$stateProvider", function ($stateProvider) {

        $stateProvider

            .state("reminders", {
                url: "/reminders",
                views: {

                    '': { templateUrl: 'app/reminders/partials/reminder/reminders.html' },

                    'create@reminders': {
                        templateUrl: "app/reminders/partials/reminder/reminders.create.html",
                        controller: "ReminderCtrl"
                    },

                    'list@reminders': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            reminderList: function ($q, ReminderService) {
                                var deferred = $q.defer();
                                ReminderService
                                    .getAllReminders()
                                    .then(function (response) {
                                        deferred.resolve(response);
                                    }).catch(function () {
                                        deferred.resolve([]);
                                    });

                                return deferred.promise;
                            }
                        }
                    }
                },
                title: "Reminders - Reme.io"
            });
    }]);
