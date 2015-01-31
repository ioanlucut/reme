angular
    .module("reminders")
    .filter('groupLimit', function () {
        return function (inputGrouped, input, limit) {
            var out = [],
                i, n;

            if ( limit > input.length )
                limit = input.length;
            else if ( limit < -input.length )
                limit = -input.length;

            if ( limit > 0 ) {
                i = 0;
                n = limit;
            } else {
                i = input.length + limit;
                n = input.length;
            }

            var inputGroupedReminders;
            var idx = 0;
            var idxReminders = 0;
            for ( ; idx < inputGrouped.length; idx++ ) {
                inputGroupedReminders = inputGrouped[idx].values;

                for ( ; idxReminders < inputGroupedReminders.length; idxReminders++ ) {
                    if ( out.length === n ) {
                        inputGroupedReminders.splice(idxReminders, 1);
                    }
                }

                // If current group is empty, remove it
                if ( inputGroupedReminders === 0 ) {
                    inputGrouped.splice(idx, 1);
                }
            }

            return out;
        };
    });