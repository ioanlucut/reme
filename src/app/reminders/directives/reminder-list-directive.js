/* Email list */

angular
    .module("reminders")
    .directive("reminderList", function ($rootScope, $timeout, ReminderDeleteModalService, ReminderUpdateModalService, REMINDER_EVENTS) {
        return {
            restrict: "A",
            scope: {
                reminders: "="
            },
            templateUrl: "app/reminders/partials/reminder/reminder.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.sortAscendent = attrs.sort === "asc";

                /**
                 * Current user email.
                 * @type {User.$new.model.email|*|.$new.model.email}
                 */
                scope.currentUserEmail = $rootScope.currentUser.model.email;

                /**
                 * Default number of reminders to be displayed.
                 * @type {number}
                 */
                scope.defaultRemindersLimit = 15;

                /**
                 * Number of the filtered reminders
                 */
                scope.filteredReminders = 0;

                /**
                 * Search by text
                 * @type {string}
                 */
                scope.searchByText = "";

                /**
                 * Tells if the search by is activated;
                 */
                scope.isSearchByActivated = function () {
                    return scope.searchByText !== "" && !_.isUndefined(scope.searchByText);
                };

                /**
                 * Is loading more reminders flag.
                 * @type {boolean}
                 */
                scope.isLoadingMore = false;

                /**
                 * Past reminders limit - initially has the default value.
                 * @type {number}
                 */
                scope.remindersLimit = scope.defaultRemindersLimit;

                /**
                 * Load more upcoming reminders.
                 */
                scope.loadMoreReminders = function () {
                    scope.isLoadingMore = true;
                    $timeout(function () {
                        scope.remindersLimit = scope.remindersLimit + scope.defaultRemindersLimit;
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
                 * @param reminderIndex
                 */
                scope.openDeleteReminderModalService = function (reminder, reminderIndex) {
                    ReminderDeleteModalService.open(reminder, reminderIndex);
                };

                /**
                 * Open UN SUBSCRIBE modal - which is the same as DELETE modal.
                 * @param reminder
                 * @param reminderIndex
                 */
                scope.openUnSubscribeReminderModalService = function (reminder, reminderIndex) {
                    ReminderDeleteModalService.open(reminder, reminderIndex);
                };

                /**
                 * Open UPDATE modal
                 * @param reminder
                 * @param reminderIndex
                 */
                scope.openUpdateReminderModalService = function (reminder, reminderIndex) {
                    if ( reminder.isCreatedBy(scope.currentUserEmail) ) {
                        ReminderUpdateModalService.open(reminder, reminderIndex);
                    }
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

                /**
                 * On reminder deleted flag the deleted index.
                 */
                scope.$on(REMINDER_EVENTS.isDeleted, function (event, args) {
                    // Set the current removed reminder index.
                    scope.removedReminderIndex = args.reminderIndex;
                });

                /**
                 * On reminder updated flag the updated index.
                 */
                scope.$on(REMINDER_EVENTS.isUpdated, function (event, args) {
                    // Set the current updated reminder index.
                    scope.updatedReminderIndex = args.reminderIndex;
                });
            }
        }
    });
