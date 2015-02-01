/* Feedback modal */

angular
    .module("feedback")
    .service("FeedbackModalService", function ($modal) {

        /**
         * Feedback modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define feedback modal object.
         */
        this.open = function () {

            this.modalInstance = $modal.open({
                templateUrl: "app/feedback/partials/feedback-modal.html",
                controller: "FeedbackModalCtrl",
                windowClass: "modal-feedback"
            });
        };

    });
