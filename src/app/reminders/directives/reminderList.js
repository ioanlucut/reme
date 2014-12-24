/* Email list */

angular
    .module("reminders")
    .directive("reminderList", function ($rootScope) {
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
                scope.currentUserEmail = $rootScope.currentUser.model.email;
            }
        }
    });
