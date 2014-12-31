describe('TimezoneProvider', function () {

    // Inject app
    beforeEach(module("app"));

    it('Should inject the service', inject(function (TimezoneProvider) {
        expect(TimezoneProvider).toBeTruthy();
    }));

    it('Should return the timezone list', inject(function (TimezoneProvider) {
        var timezones = TimezoneProvider.getTimezones();
        expect(timezones).toBeTruthy();
        expect(timezones.length).toBeGreaterThan(0);
    }));

    it('Should contain a proper timezone objects', inject(function (TimezoneProvider) {
        var timezones = TimezoneProvider.getTimezones();
        expect(timezones).toBeTruthy();
        expect(timezones.length).toBeGreaterThan(0);
        expect(timezones[0].key).toBeTruthy();
        expect(timezones[0].value).toBeTruthy();
    }));

    it('Should retrieve a description properly', inject(function (TimezoneProvider) {
        var timezoneDetail = TimezoneProvider.getTimezoneDescription("Asia/Singapore");
        expect(timezoneDetail).toBeTruthy();
        expect(timezoneDetail.value).toEqual("(UTC+08:00) Singapore");
    }));
});