/* Email list */

angular
    .module("reminders")
    .directive("reminderList", function ($rootScope, $timeout, ReminderDeleteModalService, ReminderUpdateModalService, ReminderMatchingGroupService, REMINDER_EVENTS) {
        return {
            restrict: "A",
            scope: {
                reminders: "=",
                searchByText: "="
            },
            templateUrl: "app/reminders/partials/reminder/reminder.list.template.html",
            link: function (scope, el, attrs) {

                /**
                 * The way of sort
                 * @type {boolean}
                 */
                scope.reverseOrder = attrs.sort === "desc";

                /**
                 * Current user email.
                 * @type {User.$new.model.email|*|.$new.model.email}
                 */
                scope.currentUserEmail = $rootScope.currentUser.model.email;

                /**
                 * Default number of reminders to be displayed.
                 * @type {number}
                 */
                scope.defaultRemindersLimit = 5;

                /**
                 * Number of the filtered reminders
                 */
                scope.filteredReminders = 0;

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
                 * Show past reminders block content
                 * @type {boolean}
                 */
                scope.showRemindersContent = true;

                /**
                 * If empty reminders content message should be shown
                 * @type {boolean}
                 */
                scope.showEmptyRemindersContent = attrs.showEmptyContent === "true";

                // ---
                // Set up the toggle reminders content functionality.
                // ---

                if ( attrs.toggleContent === "true" ) {

                    /**
                     * Set reminders content settings
                     * @type {boolean}
                     */
                    scope.showRemindersContent = false;

                    /**
                     * Toggle past reminders content.
                     */
                    scope.togglePastRemindersContent = function () {
                        scope.showRemindersContent = !scope.showRemindersContent;
                    };
                }

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

                scope.showGroupIfFirst = function (reminder, reminderIndex) {
                    if ( reminder.isCreatedBy(scope.currentUserEmail) ) {
                        ReminderUpdateModalService.open(reminder, reminderIndex);
                    }
                };

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
