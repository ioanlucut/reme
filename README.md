<div align="center">

<img src="src/assets/img/logo.svg" alt="Reme logo: a white bell on a purple circle" width="72">

# Reme

**A side project from 2014: email reminders you write as a sentence.**

Type _"Pay rent @tomorrow at 3pm"_ and Reme emails you on time. Sorin Pantiș and Tamás Pap founded it, and I joined them as a co-founder. I built my part in the evenings and weekends around my day job. Twelve years later I brought it back to life, so it runs again, entirely in your browser.

[![CI](https://github.com/ioanlucut/reme/actions/workflows/ci.yml/badge.svg)](https://github.com/ioanlucut/reme/actions/workflows/ci.yml)
[![Product Hunt: #6 of the day, February 2014](https://img.shields.io/badge/Product%20Hunt-%236%20of%20the%20day%2C%20Feb%202014-da552f)](https://www.producthunt.com/products/reme-io)
![Side project, 2014–2016](https://img.shields.io/badge/side%20project-2014%E2%80%932016-8471B1)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

<a href="#run-it-locally"><img src="docs/images/reme-demo.gif" alt="Reme demo: enter an email on the landing page, land in the reminders list, type 'Book the dentist @next friday at 9am', watch the date and time fill themselves in, and see the reminder appear in the list." width="100%"></a>

**[Run it locally →](#run-it-locally)** Two commands, no backend, no sign-up.

</div>

## Why this repo exists

Reme was never my day job. I built my part of it in my own time, launched it with the team, and kept improving it. I keep it public because it shows how I like to work, more than any single technology does.

- **Built after hours.** 81% of my 577 commits to Reme (merges excluded) were made on weekends or on weekday evenings and nights, going by their own timestamps. 127 of them were made after midnight, and Saturday was my busiest day.
- **Shipped fast.** Reme 2.0 went from its first commit on 15 November 2014 to live on 17 January 2015: nine weeks, with 501 commits by the end of 2014.
- **Put in front of people.** The first Reme was #6 of the day on [Product Hunt](https://www.producthunt.com/products/reme-io) on 27 February 2014, and was reviewed by [dotTech](https://dottech.org/155679/web-review-reme-io-app/) and [One Page Love](https://onepagelove.com/reme-io).
- **A real share of the work.** I wrote 648 of the 919 commits of Reme 2.0 (2014–2016): the module architecture, JWT authentication, the reminders list and its grouping, the natural-language editor, and the build and deployment.
- **Still cared about ten years later.** In 2026 I revived it on my own. That meant a new build, a demo that needs no backend, fixes for bugs that had lain dormant for a decade, tests that run on every push, and a clean history.

The stack is from 2014 (AngularJS 1.3, Bootstrap 3, gulp) and it isn't the point. The point is the rest: picking a small idea worth building, shipping it with a team, getting it in front of people, and coming back to fix what's broken.

## What Reme does

The whole product is one idea: **a reminder should take less time to write than to forget.**

1. **You write the reminder the way you'd say it.** Everything before the `@` is what to remember, and everything after it is when. Since the 2026 revival the `@` is optional, so `Meeting tomorrow at 3pm` works too. The date and time pickers update as you type, and you can still adjust them by hand. [How it reads a sentence](#a-sentence-as-the-interface) is below.
2. **Reme emails you when it's due.** The reminder is scheduled in the timezone of the browser it was written in.
3. **You can remind other people too.** Add more recipients and they get the email as well. They see the reminder in their own list and can unsubscribe from it.
4. **Your reminders stay organised.** They're grouped as _Today_, _Tomorrow_, _This month_, _Next month_ and so on, with upcoming and past reminders kept apart.

<table>
<tr>
<td width="50%"><img src="docs/images/create.png" alt="The reminder dialog: the text 'Book the dentist @next friday at 9am' has set the date picker to a Friday and the time picker to 09:00 AM"></td>
<td width="50%"><img src="docs/images/reminders.png" alt="The reminders list with the new dentist reminder, grouped under Tomorrow and This month, with recipient and shared-reminder icons"></td>
</tr>
<tr>
<td><sub>The date and time are parsed from the text as you type.</sub></td>
<td><sub>Upcoming reminders, grouped by when they're due.</sub></td>
</tr>
</table>

## A sentence as the interface

In 2014, most web apps asked for a date from a calendar widget and a time from a dropdown. A few tools, such as Google Calendar's Quick Add, could already read a date from text. Reme built the whole product around that idea: one sentence, no form and, in its first version, no account. It was featured on [Product Hunt](https://www.producthunt.com/products/reme-io) on 27 February 2014, and [dotTech's review of 8 April 2014](https://dottech.org/155679/web-review-reme-io-app/) walked readers through the `@` syntax.

Reme split the sentence into two parts. Everything before the `@` became the text of the reminder, and everything after it was parsed as a date. It updated the date and time pickers on every keystroke, entirely in the browser.

Here is what Reme reads from the examples its own reminder dialog suggested. The results come from the same Sugar 1.4.1 parser Reme shipped, running in the browser with the clock set to Monday, 5 January 2015, 09:00:

| You type                                      | Reminder                        | Due                            |
| --------------------------------------------- | ------------------------------- | ------------------------------ |
| `Pay rent @tomorrow at 3pm`                   | Pay rent                        | Tuesday 6 January 2015, 15:00  |
| `Send email to Rachel @in 4 hours`            | Send email to Rachel            | Monday 5 January 2015, 13:00   |
| `Team meeting @10am`                          | Team meeting                    | Monday 5 January 2015, 10:00   |
| `Josh's birthday party @next Friday at 18:00` | Josh's birthday party           | Friday 16 January 2015, 18:00  |
| `Christmas gifts @dec 20 at 3pm`              | Christmas gifts                 | Sunday 20 December 2015, 15:00 |
| `My brother's wedding next month @June 22`    | My brother's wedding next month | Monday 22 June 2015            |
| `Renew the passport @in 3 weeks`              | Renew the passport              | Monday 26 January 2015, 09:00  |

The `@` split is what lets _"next month"_ stay part of the wedding's text rather than change its date.

It was a grammar, not a language model. [Sugar](https://sugarjs.com/) recognised a fixed set of date expressions in a few milliseconds, with no server round trip. It had no word for `noon`, for example: typing `@next monday at noon` set the date from the part it understood and left the time alone. The core of the directive, as it was in 2016 ([`nlpDateDirective.js`](https://github.com/ioanlucut/reme/blob/original-2016/src/app/common/directives/nlpDateDirective.js)):

```js
// If a separator was specified, use it
if (text && attrs.separator) {
    text = text.split(attrs.separator)[1];
}

// Don't parse empty strings
if (!text) return;

// Parse the string with SugarJS (http://sugarjs.com/)
var date = Date.create(text);
if (!date.isValid()) return;
```

The directive then checks that the date isn't in the past, and flashes the date picker, the time picker or both, depending on what changed.

The 2026 revival taught it three more things, each covered by tests:

- **The `@` is optional.** Without one, Reme takes the longest run of words at the end of the sentence that reads as a date from today onwards, so `Meeting tomorrow at 3pm` works. `Read chapter 5` stays a plain reminder, because a bare number isn't taken as a date.
- **A day without a time keeps the time already picked.** `Call John @friday` used to be due at midnight.
- **An `@` inside an email address is not the separator.** `Email bob@acme.com about the invoice tomorrow at 10am` keeps its full text.

## Coming back to it in 2026

The last code change landed in May 2016, and the only later commits were two README edits in 2024. By 2026 the API at `api.reme.io` was offline and the build no longer ran. I brought it back without rewriting the app:

|              | 2016                                                           | 2026                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build        | gulp 3, bower, Ruby Sass, PhantomJS, committed `build/` output | One dependency-free Node script ([`scripts/build.mjs`](scripts/build.mjs)) and Dart Sass                                                                                      |
| Dependencies | bower packages, two of whose repositories no longer exist      | npm, pinned to the 2015 versions or the nearest published ones; one vendored file                                                                                             |
| Backend      | Reme's API at `api.reme.io`                                    | An in-browser fake of the same API ([`src/demo/mock-api.js`](src/demo/mock-api.js)), on AngularJS's own `ngMockE2E`, and no sign-up: every way in signs you in as a demo user |
| Hosting      | S3 and CloudFront, deployed from CircleCI                      | None needed: `npm start` runs it locally                                                                                                                                      |
| Tests        | 17 Jasmine specs on Karma and PhantomJS                        | The same 17 specs on Karma and headless Chrome, plus 8 new ones and Playwright end-to-end tests, run by GitHub Actions on every push                                          |
| Analytics    | Mixpanel and Intercom                                          | Stubbed out; nothing leaves the browser                                                                                                                                       |

It also fixed what had broken, or had always been broken:

- **A list that lost reminders.** The 2016 filter that shows the first five reminders removed items from shared, cached groups while looping over them. After a few new reminders it skipped the ones due soonest. It's now a pure filter sorted by due date, with a regression test.
- **Groups out of order.** Each group was sorted by a reference date, and "This month" (now) came before "Tomorrow" (now plus a day). Groups are now ordered by their earliest reminder, with a test pinned to a fixed date.
- **A date limit from 2014.** The reminder input, carried over from the first Reme, rejected every date after 1 January 2018 (`max-date="2018-01-01"`). From 2018 on, typing a date silently did nothing.
- **Layout.** A header button whose label overflowed it, settings tabs that covered the logo on phones, "How it works" illustrations cut in half on phones, and hidden tooltips that widened the page.
- **Dead ends.** Links to the retired Twitter and Facebook accounts, and a contact address on a domain that has since changed hands, now point to this repository. A loading spinner that only existed in the old build output is back.
- **Leftovers.** Two Romanian placeholders in the profile form, and a signup confirmation title whose lines overlapped.
- **The fonts.** The Typekit kit for Proxima Nova is gone, so [Figtree](https://fonts.google.com/specimen/Figtree) stands in.
- **The history.** It was cleaned for publishing: deploy credentials and personal data (email addresses and photos) were removed from every commit. All 919 commits from 2014–2016 and their authors are kept.

## Project history

<img src="docs/images/2015-landing.png" alt="The Reme 2.0 landing page from the 2015 press kit: 'Create email reminders in seconds!' with an email field and a 'Get started for FREE!' button" width="100%">

The first Reme was a single page with no sign-up: one text box, where you wrote the reminder as a sentence and added the email addresses to send it to. It was covered by [dotTech](https://dottech.org/155679/web-review-reme-io-app/) and [One Page Love](https://onepagelove.com/reme-io). This repository is **Reme 2.0**, the rewrite that added accounts, shared reminders and a reminders list around the first version's natural-language editor, which it [imported in December 2014](https://github.com/ioanlucut/reme/commit/78ac2ce). The 2.0 landing page (above, from its 2015 press kit) reassured first-generation users that _"the reminders created in old Reme will be imported in your account after you sign up."_

- **February–April 2014.** The first Reme launches:
    - featured on Product Hunt on 27 February, finishing #6 of the day;
    - first captured by the Wayback Machine on [2 March](https://web.archive.org/web/20140302100921/http://reme.io/);
    - reviewed by dotTech on 8 April.
- **November–December 2014.** The rewrite starts, with 501 commits by the end of the year: accounts, JWT authentication and the new reminders list.
- **January–February 2015.** Version 2.0 goes live (`v2.0.0` on 17 January), followed by fixes up to `v2.0.4` on 2 February, including a home-grown feedback form that replaced a paid service.
- **Late 2015 to February 2016.** Deployment moves to S3 and CloudFront with CircleCI (`v2.1.5`).
- **April–May 2016.** The last redesign: a video landing page and a new reminders list.
- **2015–2016.** Next came another side project of mine, [Revaluate](https://github.com/ioanlucut/revaluate-web).
- **2026.** The revival described above.

The code exactly as it was left in 2016 is preserved at the [`original-2016`](https://github.com/ioanlucut/reme/tree/original-2016) tag.

## Run it locally

You need Node.js 20 or newer.

```sh
npm install
npm start          # http://localhost:3000, rebuilds when src/ changes
```

| Command            | What it does                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| `npm start`        | Build, serve on port 3000 and rebuild on every change under `src/`      |
| `npm run build`    | Build into `dist/`; add `-- --base /reme/` to serve from a sub-path     |
| `npm test`         | Build, then run the Jasmine unit tests (17 of them from 2015) in Chrome |
| `npm run test:e2e` | Run the Playwright end-to-end tests against the demo                    |

Everything runs in the browser. There is no sign-up or log-in: every button signs you in as a demo user, and the landing page's email field uses the address you type. The demo keeps its state in `localStorage` and never sends an email.

## Under the hood

How the 2014–2016 app is built, for the curious.

<details>
<summary>How the app is put together</summary>

Reme is an AngularJS 1.3 single-page app of about 4,800 lines of JavaScript in 93 files, plus 3,600 lines of SCSS.

- **Modules.** Each feature is its own Angular module: `remeSite` (landing, about, privacy and error pages), `remeAccount` (sign-up, login, password reset, profile and preferences), `remeReminders` (the list and the create, edit and delete dialogs) and `remeCommon` (the shared directives, filters, interceptors and session). Routing uses `ui-router` states, and an auth filter keeps signed-out users away from `/reminders` and `/account/settings`.
- **Sign-up by email.** The landing page only asks for an email address. The account is created from the link in the verification email, with the timezone detected by `jstz`.
- **Stateless auth.** The API returns a JWT in the `authtoken` response header. The app keeps it in `localStorage` and an `$http` interceptor attaches it as a `Bearer` token to every request. A second interceptor converts between the app's camelCase and the API's snake_case JSON.
- **Natural-language dates.** The `nlp-date` directive described above, built on [Sugar](https://sugarjs.com/)'s `Date.create`.
- **Grouping.** Reminders are split into upcoming and past, then labelled by relative period, with long lists paged by _Load more_.
- **Design.** The SCSS is BEM-style on top of Bootstrap 3, with a custom icon font and Ladda loading buttons.

```
src/
  app/             the AngularJS app, one folder per module (site, account, reminders, common)
  demo/            the in-browser fake API and the demo wiring (added in 2026)
  sass/            global styles on top of Bootstrap 3
  template/        overrides for the angular-ui-bootstrap templates
  assets/          fonts, images and the landing page video
scripts/           build.mjs and serve.mjs
e2e/               Playwright tests
vendor/            angular-flash 0.1.14, which is not published to npm
```

</details>

## The team

|                                                |                                                                                                                                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Ioan Lucuț](https://github.com/ioanlucut)     | Co-founder, joined after Reme was founded. Front-end engineering: architecture, auth, reminders, natural-language dates, build and deployment. 648 commits, and the 2026 revival. |
| [Sorin Pantiș](https://github.com/sorinpantis) | Co-founder. Design and front end: the visual design, layouts and responsive styles. 270 commits.                                                                                  |
| [Tamás Pap](https://github.com/tamaspap)       | Co-founder. The About page, and [`url-to`](https://github.com/tamaspap/url-to), the small library Reme uses to build URLs.                                                        |

## License

[MIT](LICENSE) © 2014–2026 Ioan Lucuț, Sorin Pantiș and Tamás Pap
