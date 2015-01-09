/**
 * Dates utils service.
 */
angular
    .module("common")
    .service("DatesUtils", function () {

        this.prepareDate = function (givenDate) {
            var step = 30;
            var minute = moment().minutes();
            var hours = moment().hours();

            if ( minute > step ) {
                minute = 0;
                hours += 1;
            }
            else {
                minute = step;
            }

            return Date.create(givenDate).set({ hours: hours, minute: minute, second: 0 });
        };

    });
