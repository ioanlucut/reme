/* Email list */

angular
    .module("reminders")
    .directive("reminderList", function ($rootScope, $timeout, ReminderDeleteModalService, ReminderUpdateModalService) {
        return {
            restrict: "A",
            scope: {
                reminders: "=",
                onUpdate: "&",
                onDelete: "&",
                onUnsubscribe: "&"
            },
            templateUrl: "app/reminders/partials/reminder/reminder.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * Current user email.
                 * @type {User.$new.model.email|*|.$new.model.email}
                 */
                scope.currentUserEmail = $rootScope.currentUser.model.email;

                /**
                 * Default number of reminders to be displayed.
                 * @type {number}
                 */
                var defaultRemindersLimit = 5;

                /**
                 * Is loading more reminders flag.
                 * @type {boolean}
                 */
                scope.isLoadingMore = false;

                /**
                 * Past reminders limit - initially has the default value.
                 * @type {number}
                 */
                scope.remindersLimit = defaultRemindersLimit;

                /**
                 * Load more upcoming reminders.
                 */
                scope.loadMoreReminders = function () {
                    scope.isLoadingMore = true;
                    $timeout(function () {
                        scope.remindersLimit = scope.remindersLimit + defaultRemindersLimit;
                        scope.isLoadingMore = false;
                    }, 500);
                };

                /**
                 * Past reminders still to be loaded ?
                 * @returns {boolean}
                 */
                scope.isStillRemindersToBeLoaded = function () {
                    return scope.remindersLimit < scope.reminders.length;
                };

                /**
                 * Open DELETE modal
                 * @param reminder
                 */
                scope.openDeleteReminderModalService = function (reminder) {
                    ReminderDeleteModalService.open(reminder);
                };

                /**
                 * Open UN SUBSCRIBE modal - which is the same as DELETE modal.
                 * @param reminder
                 */
                scope.openUnSubscribeReminderModalService = function (reminder) {
                    ReminderDeleteModalService.open(reminder);
                };

                /**
                 * Open UPDATE modal
                 * @param reminder
                 */
                scope.openUpdateReminderModalService = function (reminder) {
                    ReminderUpdateModalService.open(reminder);
                };

                /**
                 * After last element is removed, perform a 1,5 second pause.
                 */
                scope.$watch("reminders.length", function (newValue, oldValue) {

                    // Is new reminder created while having empty list ?
                    scope.firstReminderCreated = !!(newValue === 1 && oldValue === 0);

                    //Hook to check when we deleted the last reminder
                    if ( newValue === 0 ) {
                        $timeout(function () {
                            scope.isReminderListEmpty = true;
                        }, 1500);
                    } else {
                        $timeout(function () {
                            scope.isReminderListEmpty = false;
                        })
                    }

                });
            }
        }
    });
