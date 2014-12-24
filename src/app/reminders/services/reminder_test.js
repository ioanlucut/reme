describe('Reminder', function () {

    // Inject app
    beforeEach(module("app"));

    it('Should inject the service', inject(function (Reminder) {
        expect(Reminder).toBeTruthy();
    }));

    it('Should perform isCreatedBy method correctly', inject(function (Reminder, ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            createdByUser: { email: "createdByEmail@email.email" },
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.reminderId).toEqual(reminderDto.reminderId);
        expect(actual.model.dueOn).toEqual(reminderDto.dueOn);
        expect(actual.model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);

        //isCreatedBu
        expect(actual.isCreatedBy("createdByEmail@email.email")).toBe(true);
    }));

    it('Should perform isManyRecipients method correctly - if only 1 recipient is there', inject(function (Reminder, ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }]
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(false);
    }));

    it('Should perform isManyRecipients method correctly - if only 0 recipient is there', inject(function (Reminder, ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: []
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(false);
    }));

    it('Should perform isManyRecipients method correctly - if 2 recipients are there', inject(function (Reminder, ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();

        //isCreatedBu
        expect(actual.isManyRecipients()).toBe(true)
    }));
});