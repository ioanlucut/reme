describe('ReminderTransformerService', function () {

    // Inject app
    beforeEach(module("app"));

    // Successfully injected
    it('Should be successfully injected - truthy', inject(function (ReminderTransformerService) {
        expect(ReminderTransformerService).toBeTruthy();
    }));

    it('Should be truthy even toReminders is called with empty params', inject(function (ReminderTransformerService) {
        expect(ReminderTransformerService).toBeTruthy();
        expect(ReminderTransformerService.toReminders()).toBeTruthy();
        expect(ReminderTransformerService.toReminders()).toEqual([]);
    }));

    it('Should convert a Reminder model properly', inject(function (ReminderTransformerService, Reminder) {
        var reminderDto = {
            reminderId: "1"
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.reminderId).toEqual(reminderDto.reminderId);
    }));

    it('Should convert a Reminder model properly', inject(function (ReminderTransformerService, Reminder) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            additionalAddresses: "xx@xx,yy@yy"
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.reminderId).toEqual(reminderDto.reminderId);
        expect(actual.model.dueOn).toEqual(reminderDto.dueOn);
        expect(actual.model.additionalAddresses).toEqual(["xx@xx", "yy@yy"]);
    }));

});