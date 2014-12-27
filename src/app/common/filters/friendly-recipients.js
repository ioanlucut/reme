angular
    .module("common")
    .filter('friendlyRecipients', function () {
        return function (recipients) {

            if ( _.isUndefined(recipients) || !_.isArray(recipients) ) {
                return;
            }

            var friendlyRecipients = "";
            _.each(recipients, function (recipient) {
                if ( friendlyRecipients.length > 0 ) {
                    friendlyRecipients = friendlyRecipients + ", "
                }
                friendlyRecipients = friendlyRecipients + recipient.email;
            });

            return friendlyRecipients;
        };
    });
