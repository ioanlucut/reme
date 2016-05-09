angular
  .module('remeReminders')
  .filter('remindersHeader', function ($sce) {
    return function (text, reverse) {
      var template = reverse ? '<a class="reminder-list-box__header__past" href="#">Show previous $1 reminders</a>' : '<span class="reminder-list-box__header__upcoming"></span>';

      return $sce.trustAsHtml(template.replace('$1', text || '0'));
    };
  });
