describe('ReminderTransformerService', function () {

    // Inject app
    beforeEach(module("app"));

    it('Should inject the service', inject(function (ReminderTransformerService) {
        expect(ReminderTransformerService).toBeTruthy();
    }));

    it('Should transform a reminder DTO to reminder business object', inject(function (ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actual = ReminderTransformerService.toReminder(reminderDto);
        expect(actual.model).toBeTruthy();
        expect(actual.model.reminderId).toEqual(reminderDto.reminderId);
        expect(actual.model.dueOn).toEqual(reminderDto.dueOn);
        expect(actual.model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should transform a reminder to a reminder DTO and remove everything after @', inject(function (ReminderTransformerService, Reminder) {

        var reminder = Reminder.build({
            reminderId: "1",
            text: "ABC @Today",
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        });

        var actualReminderDto = ReminderTransformerService.toReminderDto(reminder);
        expect(actualReminderDto).toBeTruthy();
        expect(actualReminderDto.reminderId).toEqual(reminder.model.reminderId);
        expect(actualReminderDto.text).toEqual("ABC");
        expect(actualReminderDto.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should transform a reminder to a reminder DTO', inject(function (ReminderTransformerService, Reminder) {

        var reminder = Reminder.build({
            reminderId: "1",
            text: "ABC",
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        });

        var actualReminderDto = ReminderTransformerService.toReminderDto(reminder);
        expect(actualReminderDto).toBeTruthy();
        expect(actualReminderDto.reminderId).toEqual(reminder.model.reminderId);
        expect(actualReminderDto.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should be truthy even toReminders is called with empty params', inject(function (ReminderTransformerService) {
        expect(ReminderTransformerService).toBeTruthy();
        expect(ReminderTransformerService.toReminders()).toBeTruthy();
        expect(ReminderTransformerService.toReminders()).toEqual([]);
    }));

    it('Should transform a NULL reminder list of DTOs to empty list of reminders business object', inject(function (ReminderTransformerService) {
        var actualReminders = ReminderTransformerService.toReminders(null);
        expect(actualReminders).toBeTruthy();
        expect(actualReminders.length).toBe(0);
        expect(actualReminders).toEqual([]);
    }));

    it('Should transform a reminder list of DTOs to a list of reminders business object', inject(function (ReminderTransformerService) {
        var reminderDto = {
            reminderId: "1",
            text: "ABC",
            dueOn: new Date(),
            recipients: [{ email: "xx@xx" }, { email: "yy@yy" }]
        };

        var actualReminders = ReminderTransformerService.toReminders([reminderDto, reminderDto]);
        expect(actualReminders).toBeTruthy();
        expect(actualReminders.length).toBe(2);
        expect(actualReminders[0]).toBeTruthy();
        expect(actualReminders[1]).toBeTruthy();

        expect(actualReminders[0].model).toBeTruthy();
        expect(actualReminders[0].model.reminderId).toEqual(reminderDto.reminderId);
        expect(actualReminders[0].model.dueOn).toEqual(reminderDto.dueOn);
        expect(actualReminders[0].model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);

        expect(actualReminders[1].model).toBeTruthy();
        expect(actualReminders[1].model.reminderId).toEqual(reminderDto.reminderId);
        expect(actualReminders[1].model.dueOn).toEqual(reminderDto.dueOn);
        expect(actualReminders[1].model.recipients).toEqual([{ email: "xx@xx" }, { email: "yy@yy" }]);
    }));

    it('Should remove duplicate emails inside a reminder recipients', inject(function (ReminderTransformerService, Reminder) {

        var reminder = Reminder.build({
            reminderId: "1",
            text: "ABC @Today",
            recipients: [{ email: "xx@xx" }, { email: "xx@xx" }, { email: "tyxx@xx" }, { email: "xxx@xx" }]
        });

        var actualReminderDto = ReminderTransformerService.toReminderDto(reminder);
        expect(actualReminderDto).toBeTruthy();
        expect(actualReminderDto.reminderId).toEqual(reminder.model.reminderId);
        expect(actualReminderDto.text).toEqual("ABC");

        console.log(actualReminderDto.recipients);
        expect(actualReminderDto.recipients).toEqual([{ email: "xx@xx" }, { email: "tyxx@xx" }, { email: "xxx@xx" }]);
    }));

});