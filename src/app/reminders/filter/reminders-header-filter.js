angular
    .module("reminders")
    .filter('remindersHeader', function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<a class="reminder-list-box__header__past" href="#">You have $1 past reminders</a>' : '<span class="reminder-list-box__header__upcoming">Your upcoming reminders</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    });