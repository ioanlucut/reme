angular
    .module("reminders")
    .filter('remindersHeader', function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<span class="reminder-list-box__header__past">$1 past reminders</span>' : '<span class="reminder-list-box__header__upcoming">You have $1 upcoming reminders</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    });