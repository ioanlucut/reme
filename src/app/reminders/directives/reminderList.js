/* Email list */

angular
    .module("reminders")
    .directive("reminderList", function () {
        return {
            restrict: "A",
            scope: {
                reminders: "=",
                onUpdate: "&",
                onDelete: "&"
            },
            templateUrl: "app/reminders/partials/reminder/reminder.list.template.html",
            link: function (scope, el, attrs) {
            }
        }
    });
