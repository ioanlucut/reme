angular
    .module("feedback")
    .service("FeedbackService", function (FEEDBACK_URLS, $http) {

        this.sendFeedback = function (feedback) {
            return $http
                .post(URLTo.api(FEEDBACK_URLS.feedback), {
                    subject: feedback.model.subject,
                    message: feedback.model.message
                });
        };
    });
