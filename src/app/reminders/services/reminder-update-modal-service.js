/* Feedback modal */

angular
  .module('reminders')
  .service('ReminderUpdateModalService', function ($modal) {

    // Init modal instance
    this.modalInstance = null;

    // Init the feedback modal window
    this.open = function (reminderToBeUpdated, reminderIndex, backdrop) {

      // Create modal instance
      this.modalInstance = $modal.open({
        templateUrl: '/app/reminders/partials/reminderModal/reminder_create_update_modal.html',
        controller: 'ReminderModalCtrl',
        windowClass: 'modal-feedback',
        backdrop: backdrop ? backdrop : true,
        keyboard: false,
        resolve: {
          reminder: function () {
            return reminderToBeUpdated;
          },

          reminderIndex: function () {
            return reminderIndex;
          },
        },
      });
    };

  });
