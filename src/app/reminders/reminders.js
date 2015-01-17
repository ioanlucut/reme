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
                templateUrl: 'app/reminders/partials/reminder/reminders.template.html',
                abstract: true
            })

            // Regular case
            .state("reminders.regular", {
                url: "",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderCtrl"
                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }
                        }
                    }
                },
                title: "Reminders - Reme.io"
            })

            // Review case
            .state("reminders.update", {
                url: "/{reminderId}/update",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderAutoEditCtrl",
                        resolve: {
                            reminderToReview: function ($stateParams, $q, $state, ReminderService) {
                                var deferred = $q.defer();

                                ReminderService
                                    .getDetails($stateParams.reminderId)
                                    .then(function (response) {
                                        deferred.resolve(response);

                                        return response;
                                    })
                                    .catch(function (response) {

                                        $state.go("reminders.regular");
                                        return response;
                                    });

                                return deferred.promise;
                            }
                        }

                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }
                        }
                    }
                },
                title: "Preview reminder - Reme.io"
            })

            // Opened modal
            .state("reminders.new", {
                url: "/new",
                views: {

                    'action': {
                        templateUrl: "app/reminders/partials/reminder/reminders.action.html",
                        controller: "ReminderAutoOpenCtrl"
                    },

                    'list': {
                        templateUrl: "app/reminders/partials/reminder/reminders.list.html",
                        controller: "ReminderListCtrl",
                        resolve: {
                            pastAndUpcomingReminders: function (ReminderService) {
                                return ReminderService
                                    .getAllRemindersGrouped();
                            }
                        }
                    }
                },
                title: "Preview reminder - Reme.io"
            })

    }]);