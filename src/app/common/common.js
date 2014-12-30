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
        "ui.bootstrap.modal"
    ])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push("HumpsInterceptor");
        $httpProvider.interceptors.push("JWTInterceptor");
    }).run(function (moment) {

        // Initialize moment configuration
        moment.locale('en', {
            calendar: {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: 'dddd, D MMMM',
                nextWeek: 'dddd, D MMMM',
                sameElse: function () {
                    var isSameYear = moment(moment().year()).isSame(this.years());

                    return isSameYear ? 'dddd, D MMMM' : 'dddd, D MMMM YYYY';
                }
            }
        });
    });
