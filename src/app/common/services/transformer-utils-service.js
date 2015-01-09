/**
 * Transformer utils service.
 */
angular
    .module("common")
    .service("TransformerUtils", function () {

        /**
         * Copies keys from a sourceObject to a targetObject, except given skipKeys.
         * @param sourceObject
         * @param targetObject
         * @param skipKeys
         */
        this.copyKeysFromTo = function (sourceObject, targetObject, skipKeys) {
            _.each(_.keys(sourceObject), function (key) {
                if ( !(skipKeys && _.contains(skipKeys, key)) ) {
                    targetObject[key] = sourceObject[key];
                }
            });
        };

        /**
         * Sanitize recipients (remove duplicates).
         */
        this.sanitizeRecipients = function (recipients) {

            return _.uniq(recipients, 'email');
        };
    });
