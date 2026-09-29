describe('nlpDate', function () {

  var scope;

  beforeEach(angular.mock.module('reme'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.minDate = moment().hours(0).minutes(0).seconds(0);
    scope.date = new Date(2000, 0, 1, 11, 30);

    $compile('<input ng-model="text" nlp-date date="date" separator="@" min-date="{{minDate}}" required />')(scope);
    scope.$digest();
  }));

  var type = function (text) {
    scope.text = text;
    scope.$digest();

    return scope.date;
  };

  it('parses the date after the separator', function () {
    expect(type('Pay rent @tomorrow at 3pm')).toEqual(Date.create('tomorrow at 3pm'));
  });

  it('keeps words before the separator out of the date', function () {
    expect(type('My brother\'s wedding next month @tomorrow at 9am')).toEqual(Date.create('tomorrow at 9am'));
  });

  it('finds a date at the end of the text when there is no separator', function () {
    expect(type('Meeting tomorrow at 9am')).toEqual(Date.create('tomorrow at 9am'));
    expect(type('Meeting tomorrow at 3pm')).toEqual(Date.create('tomorrow at 3pm'));
    expect(type('Dentist next friday at 9am')).toEqual(Date.create('next friday at 9am'));
  });

  it('keeps the picked time when the text names only a day', function () {
    expect(type('Meeting tomorrow')).toEqual(Date.create('tomorrow at 11:30'));
    expect(type('Pay rent @friday')).toEqual(Date.create('friday at 11:30'));
  });

  it('does not take the @ of an email address for the separator', function () {
    expect(type('Email bob@acme.com about the invoice tomorrow at 10am')).toEqual(Date.create('tomorrow at 10am'));
  });

  it('finds relative dates at the end of the text', function () {
    var expected = moment().add(2, 'hours');

    expect(Math.abs(moment(type('Call the bank in 2 hours')).diff(expected, 'seconds'))).toBeLessThan(5);
  });

  it('leaves the date alone when the text has none', function () {
    var before = scope.date;

    expect(type('Call mom')).toBe(before);
    expect(type('Read chapter 5')).toBe(before);
  });
});
