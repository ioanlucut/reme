/* Feedback message */

angular
    .module("feedback")
    .factory("FeedbackMessage", function ($http, $q, URLTo) {

        function FeedbackMessage() {

            // The url root to API urls
            this.urlRoot = "feedback";

            // Setup
            this.attributes = {};

            // Send the message
            this.send = function () {

                // Create deferred
                var deferred = $q.defer();

                $http({method: "POST", url: URLTo.api(this.urlRoot), data: this.attributes}).

                    success(function () {

                        // Resolve the deferred
                        deferred.resolve();
                    }).

                    error(function (data) {

                        // Reject the deferred with error data
                        deferred.reject(data);
                    });

                // Return the promise
                return deferred.promise;
            };
        }

        return FeedbackMessage;

    });
