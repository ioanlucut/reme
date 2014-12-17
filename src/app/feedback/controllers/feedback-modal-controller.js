/* Feedback modal controller */

angular
    .module("feedback")
    .controller("FeedbackModalCtrl", function ($scope, $timeout, FeedbackModal, FeedbackMessage) {

        $scope.isSending = false;
        $scope.isSent = false;
        $scope.feedbackMessage = new FeedbackMessage();

        // Focus the first input when modal is opened
        FeedbackModal.modalInstance.opened.then($.proxy(function () {
            $scope.isOpen = true;
        }, this));

        // Send the feedback message, and close the modal
        $scope.sendAndClose = function (feedbackForm) {
            if ( feedbackForm.$valid && !$scope.isSending ) {

                // Form is valid, send the message
                $scope.isSending = true;
                $scope.feedbackMessage.send().

                    then(function () {
                        $scope.isSent = true;

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            FeedbackModal.modalInstance.close();
                        }, 2500);
                    }).

                    finally(function () {
                        $scope.isSending = false;
                        $scope.isOpen = false;
                    });
            }
            else {
                // Form is invalid
                feedbackForm.submitted = true;
            }
        };

        $scope.cancel = function () {
            FeedbackModal.modalInstance.dismiss("cancel");
            $scope.isOpen = false;
        };
    });
