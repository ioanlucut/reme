/**
 * Main site module declaration including ui templates.
 */
angular
  .module('reminders', [
    'ui.router',
    'ui.bootstrap.transition',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.dropdown',
    'ui.bootstrap.modal',
    'ui.bootstrap.tabs',
    'angular-ladda',
    'common',
  ])
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('reminders', {
        url: '/reminders',
        templateUrl: '/app/reminders/partials/reminder/reminders.template.html',
        abstract: true,
      })

      // Regular case
      .state('reminders.regular', {
        url: '',
        views: {

          list: {
            templateUrl: '/app/reminders/partials/reminder/reminders.list.html',
            controller: 'ReminderListCtrl',
            resolve: {
              pastAndUpcomingReminders: function (ReminderService) {
                return ReminderService
                  .getAllRemindersGrouped();
              },

              reminderModalOptions: function () {
                return {};
              },

              reminderToReview: function () {
                return null;
              },
            },
          },
        },
        title: 'Reminders - Reme.io',
      })

      // Opened modal
      .state('reminders.new', {
        url: '/new',
        views: {

          list: {
            templateUrl: '/app/reminders/partials/reminder/reminders.list.html',
            controller: 'ReminderListCtrl',
            resolve: {
              pastAndUpcomingReminders: function (ReminderService) {
                return ReminderService
                  .getAllRemindersGrouped();
              },

              reminderModalOptions: function () {
                return {
                  autoOpen: true,
                };
              },

              reminderToReview: function () {
                return null;
              },
            },
          },
        },
        title: 'Preview reminder - Reme.io',
      })

      // Review case
      .state('reminders.update', {
        url: '/{reminderId}/update',
        views: {

          list: {
            templateUrl: '/app/reminders/partials/reminder/reminders.list.html',
            controller: 'ReminderListCtrl',
            resolve: {
              pastAndUpcomingReminders: function (ReminderService) {
                return ReminderService
                  .getAllRemindersGrouped();
              },

              reminderModalOptions: function () {
                return {
                  autoOpen: true,
                  reminderToReview: function ($stateParams, $state, ReminderService) {
                    return ReminderService
                      .getDetails($stateParams.reminderId)
                      .catch(function (response) {
                        $state.go('reminders.regular');

                        return response;
                      });
                  },
                };
              },

              reminderToReview: function ($stateParams, $state, ReminderService) {
                return ReminderService
                  .getDetails($stateParams.reminderId)
                  .catch(function (response) {
                    $state.go('reminders.regular');

                    return response;
                  });
              },
            },
          },
        },
        title: 'Preview reminder - Reme.io',
      });
  },
  ]);
