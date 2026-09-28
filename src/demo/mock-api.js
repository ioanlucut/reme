/**
 * An in-browser stand-in for the Reme API.
 *
 * It follows the contract the front-end expects from the original server:
 * snake_case JSON, a JWT in the `authtoken` response header, and the routes
 * declared in AUTH_URLS, USER_URLS and REMINDER_URLS. State is kept in
 * localStorage, so it survives a reload and never leaves the browser.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'reme.demo';
  var API = '/api/';

  var route = function (path) {
    return new RegExp('^' + API + path + '(\\?.*)?$');
  };

  var load = function () {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  };

  var save = function (state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Private mode or blocked storage: the demo still works for this page view.
    }
  };

  var base64Url = function (value) {
    return window.btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  // An unsigned token with the claims the app reads (it only checks `exp`).
  var jwtFor = function (user) {
    var expiresAt = Math.floor(Date.now() / 1000) + 30 * 24 * 3600;

    return [base64Url({ alg: 'none', typ: 'JWT' }), base64Url({ sub: user.user_id, exp: expiresAt }), 'demo'].join('.');
  };

  var at = function (daysFromNow, hour, minute) {
    return moment().add(daysFromNow, 'days').hours(hour).minutes(minute || 0).seconds(0).milliseconds(0).toISOString();
  };

  var userFor = function (email) {
    var name = email.split('@')[0].split(/[._-]/)[0] || 'friend';

    return {
      user_id: 1,
      email: email,
      first_name: name.charAt(0).toUpperCase() + name.slice(1),
      last_name: '',
      timezone: jstz.determine().name(),
    };
  };

  var seedReminders = function (user) {
    var owner = { email: user.email, first_name: user.first_name, last_name: user.last_name };
    var friend = { email: 'alex@example.com', first_name: 'Alex', last_name: '' };
    var reminder = function (id, text, dueOn, recipients, createdBy) {
      return {
        reminder_id: id,
        text: text,
        due_on: dueOn,
        timezone: user.timezone,
        recipients: recipients,
        created_by_user: createdBy || owner,
        created_by: (createdBy || owner).email,
        sent: false,
        is_recurring: false,
        created_at: at(-7, 9),
        updated_at: at(-7, 9),
      };
    };

    return [
      reminder(1, 'Pay rent', at(1, 15), [{ email: user.email }]),
      reminder(2, "Josh's birthday party", at(5, 18), [{ email: user.email }, { email: 'josh@example.com' }]),
      reminder(3, 'Renew the passport', at(21, 10), [{ email: user.email }]),
      reminder(4, 'Demo day rehearsal', at(3, 11), [{ email: user.email }, { email: friend.email }], friend),
      reminder(5, 'Team meeting', at(-1, 10), [{ email: user.email }]),
      reminder(6, 'Call mom', at(-3, 19), [{ email: user.email }]),
    ];
  };

  var state = function () {
    var current = load() || {};
    current.reminders = current.reminders || [];
    current.nextId = current.nextId || 100;

    return current;
  };

  // Reminders due in the past were e-mailed by the real server.
  var withSentFlags = function (reminders) {
    var now = Date.now();

    return reminders.map(function (reminder) {
      reminder.sent = new Date(reminder.due_on).getTime() <= now;

      return reminder;
    });
  };

  var isAuthorized = function (headers) {
    return Boolean(headers && /^Bearer .+/.test(headers.Authorization || ''));
  };

  var UNAUTHORIZED = [401, { errors: ['Not authenticated'] }];

  var idFrom = function (url) {
    return Number(url.replace(API, '').split('/')[1]);
  };

  // The client sends "YYYY-MM-DD HH:mm:ss" in the user's local time.
  var toIso = function (dueOn) {
    return moment(dueOn, 'YYYY-MM-DD HH:mm:ss').toISOString();
  };

  angular
    .module('remeDemo')
    .run(function ($httpBackend) {

      // ---
      // Accounts
      // ---
      var logIn = function (email) {
        var current = state();

        if (!current.user || current.user.email !== email) {
          current.user = userFor(email);
          current.reminders = seedReminders(current.user);
        }

        save(current);

        return [200, current.user, { authtoken: jwtFor(current.user) }];
      };

      $httpBackend.whenPOST(route('auth/login')).respond(function (method, url, data) {
        var credentials = angular.fromJson(data);

        return credentials.email && credentials.password ? logIn(credentials.email) : [401, { errors: ['Invalid credentials'] }];
      });

      $httpBackend.whenGET(route('accounts/details')).respond(function (method, url, data, headers) {
        return isAuthorized(headers) ? [200, state().user] : UNAUTHORIZED;
      });

      $httpBackend.whenPOST(route('accounts/update')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        var changes = angular.fromJson(data);
        angular.forEach(['first_name', 'last_name', 'timezone'], function (key) {
          if (angular.isDefined(changes[key])) {
            current.user[key] = changes[key];
          }
        });

        save(current);

        return [200, current.user];
      });

      $httpBackend.whenGET(route('accounts/is_unique_email')).respond(200, { is_unique: true });

      angular.forEach([
        'accounts/update_password',
        'accounts/send_email_verification_token',
        'accounts/request_password_reset_token',
        'accounts/reset_password_with_token/[^/]+/[^/]+',
      ], function (path) {
        $httpBackend.whenPOST(route(path)).respond(200, {});
      });

      angular.forEach([
        'accounts/validate_email_verification_token/[^/]+/[^/]+',
        'accounts/validate_password_reset_token/[^/]+/[^/]+',
      ], function (path) {
        $httpBackend.whenGET(route(path)).respond(200, {});
      });

      $httpBackend.whenPOST(route('accounts/create/[^/]+/[^/]+')).respond(function (method, url, data) {
        var account = angular.fromJson(data);
        var response = logIn(account.email);
        var current = state();

        angular.extend(current.user, {
          first_name: account.first_name || current.user.first_name,
          last_name: account.last_name || '',
          timezone: account.timezone || current.user.timezone,
        });

        save(current);

        return [200, current.user, response[2]];
      });

      // ---
      // Reminders
      // ---
      $httpBackend.whenGET(route('reminders')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        save(current);

        return [200, withSentFlags(current.reminders)];
      });

      $httpBackend.whenGET(route('reminders/\\d+')).respond(function (method, url, data, headers) {
        var reminder = _.find(state().reminders, { reminder_id: idFrom(url) });

        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        return reminder ? [200, reminder] : [404, { errors: ['Reminder not found'] }];
      });

      $httpBackend.whenPOST(route('reminders')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        var dto = angular.fromJson(data);
        var now = new Date().toISOString();
        var owner = { email: current.user.email, first_name: current.user.first_name, last_name: current.user.last_name };
        var reminder = {
          reminder_id: current.nextId++,
          text: dto.text,
          due_on: toIso(dto.due_on),
          timezone: dto.timezone || current.user.timezone,
          recipients: dto.recipients && dto.recipients.length ? dto.recipients : [{ email: current.user.email }],
          created_by_user: owner,
          created_by: owner.email,
          sent: false,
          is_recurring: false,
          created_at: now,
          updated_at: now,
        };

        current.reminders.push(reminder);
        save(current);

        return [200, reminder];
      });

      $httpBackend.whenPUT(route('reminders/\\d+')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        var dto = angular.fromJson(data);
        var reminder = _.find(current.reminders, { reminder_id: idFrom(url) });

        if (!reminder) {
          return [404, { errors: ['Reminder not found'] }];
        }

        angular.extend(reminder, {
          text: dto.text,
          due_on: toIso(dto.due_on),
          recipients: dto.recipients,
          updated_at: new Date().toISOString(),
        });

        save(current);

        return [200, reminder];
      });

      $httpBackend.whenDELETE(route('reminders/\\d+')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        var removed = _.remove(current.reminders, { reminder_id: idFrom(url) });
        save(current);

        return removed.length ? [200, removed[0]] : [404, { errors: ['Reminder not found'] }];
      });

      $httpBackend.whenPOST(route('reminders/\\d+/unsubscribe')).respond(function (method, url, data, headers) {
        if (!isAuthorized(headers)) {
          return UNAUTHORIZED;
        }

        var current = state();
        _.remove(current.reminders, { reminder_id: idFrom(url) });
        save(current);

        return [200, {}];
      });

      // Anything else (e.g. a template missing from the cache) goes to the network.
      $httpBackend.whenGET(/.*/).passThrough();
    });
})();
