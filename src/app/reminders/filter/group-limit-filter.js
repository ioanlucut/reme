angular
    .module("reminders")
    .filter('groupLimit', function () {
        return function (inputGrouped, input, limit) {
            if ( limit > input.length )
                limit = input.length;
            else if ( limit < -input.length )
                limit = -input.length;

            // Should not exceed the limit
            var commonSumIndex = 0;
            var inputGroupedReminders;
            var currentGroupIndex;

            // Remove every reminder from grouped reminders which are more than the limit
            for ( var idx = 0; idx < inputGrouped.length; idx++ ) {
                inputGroupedReminders = inputGrouped[idx].values;

                for ( currentGroupIndex = 0; currentGroupIndex < inputGroupedReminders.length; currentGroupIndex++ ) {
                    commonSumIndex += 1;

                    if ( commonSumIndex > limit ) {
                        inputGroupedReminders.splice(currentGroupIndex, 1);
                    }
                }
            }

            return inputGrouped;
        };
    });