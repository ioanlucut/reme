/**
 * Main common module declaration including ui templates.
 */
angular
    .module("common", [
        "ui.router",
        "restmod",
        "ui.bootstrap.transition",
        "ui.bootstrap.datepicker",
        "ui.bootstrap.dropdown",
        "ui.bootstrap.modal",
        "localytics.directives"
    ])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("HumpsInterceptor");
        $httpProvider.interceptors.push("JWTInterceptor");
    }).run(function () {

        /**
         * Callback function to check if the date should include year too.
         * @returns {string}
         */
        function callbackCalendarFormatter() {
            var isSameYear = moment(moment().year()).isSame(this.years());

            return isSameYear ? 'dddd, D MMMM' : 'dddd, D MMMM YYYY';
        }

        // Initialize moment configuration
        moment.locale('en', {
            calendar: {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: callbackCalendarFormatter,
                nextWeek: callbackCalendarFormatter,
                sameElse: callbackCalendarFormatter
            }
        });
    });
