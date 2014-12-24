angular
    .module("common")
    .filter('friendlyRecipients', function () {
        return function (recipients) {

            if ( _.isUndefined(recipients) || !_.isArray(recipients) ) {
                return "to you";
            }

            var recipientsFormatted = "";
            _.each(recipients, function (recipient) {
                if ( recipientsFormatted.length > 0 ) {
                    recipientsFormatted = recipientsFormatted + ", "
                }
                recipientsFormatted = recipientsFormatted + recipient.email;
            });

            return "to " + recipientsFormatted;
        };
    });
