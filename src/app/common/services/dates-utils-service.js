/**
 * Dates utils service.
 */
angular
    .module("common")
    .service("DatesUtils", function () {

        this.prepareDate = function (givenDate) {

            // ---
            // Minutes.
            // ---
            var step = 30;

            // ---
            // Current values.
            // ---

            var now = moment();
            var minute = now.minutes();
            var hours = now.hours();

            // ---
            // Compute the date.
            // ---

            if ( minute >= step ) {
                minute = 0;
                hours += 1;
            }
            else {
                minute = step;
            }

            return Date.create(givenDate).set({ hours: hours, minute: minute, second: 0 });
        };

    });
