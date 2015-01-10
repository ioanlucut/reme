/**
 * Reminders controller.
 */
angular
    .module("reminders")
    .controller("ReminderListCtrl", function ($scope, $rootScope, ReminderDeleteModalService, ReminderUpdateModalService, ReminderGroupService, REMINDER_EVENTS, $timeout, pastAndUpcomingReminders, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.remindersPage);

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Upcoming reminders
         */
        $scope.upcomingReminders = pastAndUpcomingReminders.upcomingReminders;

        /**
         * Past reminders
         */
        $scope.pastReminders = pastAndUpcomingReminders.pastReminders;

        /**
         * Reminders tabs.
         */
        $scope.reminderTabs = {
            upcomingRemindersTabActive: true,
            pastRemindersTabActive: false,

            /**
             * Set upcoming tab active.
             */
            setUpcomingRemindersTabActive: function () {
                this.upcomingRemindersTabActive = true;
                this.pastRemindersTabActive = false;
            }
        };

        /**
         * On reminder created, display a success message, and add reminder to the list.
         */
        $scope.$on(REMINDER_EVENTS.isCreated, function (event, args) {
            if ( args.reminder.model.dueOn > new Date() ) {
                $scope.upcomingReminders.push(args.reminder);
                $scope.reminderTabs.setUpcomingRemindersTabActive();
            }
            else {
                $scope.pastReminders.push(args.reminder);
            }
        });

        /**
         * On reminder updated.
         */
        $scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
        });

        /**
         * On reminder deleted, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
            $timeout(function () {
                removeReminderFrom($scope.upcomingReminders, args.reminder);
                removeReminderFrom($scope.pastReminders, args.reminder);
            });
        });

        /**
         * On reminder un subscribed, display a success message, and remove the reminder from the list.
         */
        $scope.$on(REMINDER_EVENTS.isUnSubscribed, function (event, args) {
            $timeout(function () {
                removeReminderFrom($scope.upcomingReminders, args.reminder);
                removeReminderFrom($scope.pastReminders, args.reminder);
            });
        });

        /**
         * Removes given reminder from the list.
         * @param reminderList
         * @param reminderToBeRemoved
         */
        function removeReminderFrom(reminderList, reminderToBeRemoved) {
            _.remove(reminderList, function (reminderFromArray) {
                var reminderId = _.parseInt(reminderToBeRemoved.model.reminderId, 10);
                var reminderFromArrayId = _.parseInt(reminderFromArray.model.reminderId, 10);
                if ( _.isNaN(reminderFromArrayId) || _.isNaN(reminderId) ) {
                    return false;
                }

                return reminderFromArrayId === reminderId;
            });
        }
    });