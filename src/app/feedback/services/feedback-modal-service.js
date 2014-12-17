/* Feedback modal */

angular
    .module("feedback")
    .service("FeedbackModal", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/feedback/partials/feedbackModal/feedbackModal.html",
                controller: "FeedbackModalCtrl",
                windowClass: "modal-feedback"
            });
        };

    });
