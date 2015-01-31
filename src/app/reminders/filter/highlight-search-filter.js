angular
    .module("reminders")
    .filter('highlightSearch', function ($sce) {
        return function (text, phrase) {
            if ( phrase ) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="reminder__title--highlighted">$1</span>');

            return $sce.trustAsHtml(text)
        };
    });