angular
    .module("feedback")
    .factory("Feedback", function (FeedbackService) {

        /**
         * Feedback class.
         * @constructor
         */
        function Feedback() {

            /**
             * Represents the DTO model of the Feedback.
             */
            this.model = {

                /**
                 * Feedback subject
                 */
                subject: "",

                /**
                 * Feedback message
                 */
                message: ""
            };

            /**
             * Sends a Feedback.
             * @returns {*}
             */
            this.send = function () {
                return FeedbackService.sendFeedback(this);
            };
        }

        /**
         * Builds a Feedback.
         * @returns {Feedback}
         */
        Feedback.build = function () {
            return new Feedback();
        };

        return Feedback;
    });