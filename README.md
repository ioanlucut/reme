<div align="center">

<img src="src/assets/img/logo.svg" alt="Reme logo: a white bell on a purple circle" width="72">

# Reme

**Email reminders you write as a sentence. A side project from 2014, brought back to life in 2026.**

[![Product Hunt: #6 of the day, February 2014](https://img.shields.io/badge/Product%20Hunt-%236%20of%20the%20day%2C%20Feb%202014-da552f)](https://www.producthunt.com/products/reme-io)
![Side project, 2014–2016](https://img.shields.io/badge/side%20project-2014%E2%80%932016-8471B1)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

<a href="#try-it"><img src="docs/images/reme-demo.gif" alt="Reme in use: enter an email on the landing page, land in the reminders list, type 'Book the dentist @next friday at 9am', watch the date and time fill themselves in, and see the reminder appear in the list." width="100%"></a>

</div>

## The idea

You type _"Pay rent @tomorrow at 3pm"_, and Reme emails you tomorrow at 3pm. That's it: no calendar to click through, no form to fill in. The sentence is the whole interface.

Most apps in 2014 still wanted you to pick a date from a calendar and a time from a dropdown. Reme's idea was simple: a reminder should take less time to write than to forget.

## The story

Sorin Pantiș and Tamás Pap started Reme, and I joined them as a co-founder. For me it was a side project, built around my day job. The first version was out by February 2014, when it finished #6 of the day on [Product Hunt](https://www.producthunt.com/products/reme-io). [dotTech](https://dottech.org/155679/web-review-reme-io-app/) and [One Page Love](https://onepagelove.com/reme-io) wrote about it too.

That autumn we rebuilt it as Reme 2.0, with accounts, reminders you can share with other people, and a proper list of everything you've planned. I wrote most of the new app, 648 of its 919 commits. We went from the first line of code to launch in nine weeks, between 15 November 2014 and 17 January 2015.

It really was an after-hours project. Going by the commit timestamps, more than 8 in 10 of my commits happened on weekends or in the evening, 127 of them after midnight. Saturday was my busiest day.

We kept improving it until May 2016. Along the way, in 2015, I started my next side project, [Revaluate](https://github.com/ioanlucut/revaluate-web).

## Why I'm sharing it

The technology is from 2014, and it isn't the point. What this repository shows is how I like to work. I take a small idea worth building and ship it with a team. I put it in front of real people. And I come back to fix what's broken, even ten years later.

## Bringing it back

In 2026 I opened the project again. Nothing worked any more: the server behind it was long gone, and the tools it was built with no longer installed.

I brought it back without rewriting it. It now builds with today's tools and runs entirely in your browser, with a small stand-in for the old server, so there's nothing to sign up for. Getting it running again turned up a few surprises:

- **It stopped understanding dates in 2018.** A limit written in 2014 rejected every date after 1 January 2018, so from then on typing _"@tomorrow"_ quietly did nothing.
- **The reminders list lost reminders.** After you added a few, it could hide the one due soonest, and it listed _This month_ above _Tomorrow_.
- **Some things had never quite worked.** A day without a time, like _"@friday"_, set the reminder for midnight. An email address with an `@` in it confused it. And some of the layout broke on phones.

All of these are fixed now, and tests guard each fix. You can also leave out the `@` now: _"Meeting tomorrow at 3pm"_ just works.

<table>
<tr>
<td width="50%"><img src="docs/images/create.png" alt="The reminder dialog: the text 'Book the dentist @next friday at 9am' has set the date picker to a Friday and the time picker to 09:00 AM"></td>
<td width="50%"><img src="docs/images/reminders.png" alt="The reminders list with the new dentist reminder, grouped under Tomorrow and This month"></td>
</tr>
<tr>
<td><sub>The date and time fill themselves in as you type.</sub></td>
<td><sub>Your reminders, grouped by when they're due.</sub></td>
</tr>
</table>

## Try it

You need [Node.js](https://nodejs.org/) 20 or newer. Then:

```sh
npm install
npm start
```

Open <http://localhost:3000> and click any button to get in. There's no account to create, and nothing leaves your browser; no emails are actually sent. Some sentences to try:

- `Pay rent @tomorrow at 3pm`
- `Call the bank in 2 hours`
- `Christmas gifts @dec 20 at 3pm`
- `Dentist next friday at 9am`

## The team

- **[Sorin Pantiș](https://github.com/sorinpantis)**, co-founder, designed Reme and built much of its look and feel.
- **[Tamás Pap](https://github.com/tamaspap)**, co-founder, built the About page and [`url-to`](https://github.com/tamaspap/url-to), a small library Reme uses.
- **[Ioan Lucuț](https://github.com/ioanlucut)** (me), co-founder, built most of the app, and brought it back in 2026.

## For developers

[![CI](https://github.com/ioanlucut/reme/actions/workflows/ci.yml/badge.svg)](https://github.com/ioanlucut/reme/actions/workflows/ci.yml)

<details>
<summary><b>How Reme reads a sentence</b></summary>

Everything before the `@` becomes the text of the reminder, and everything after it is parsed as a date by [Sugar](https://sugarjs.com/), on every keystroke, in the browser. Here is what it made of the examples its own dialog suggested, with Reme's original Sugar 1.4.1 and the clock set to Monday, 5 January 2015, 09:00:

| You type                                      | Reminder                        | Due                            |
| --------------------------------------------- | ------------------------------- | ------------------------------ |
| `Pay rent @tomorrow at 3pm`                   | Pay rent                        | Tuesday 6 January 2015, 15:00  |
| `Send email to Rachel @in 4 hours`            | Send email to Rachel            | Monday 5 January 2015, 13:00   |
| `Team meeting @10am`                          | Team meeting                    | Monday 5 January 2015, 10:00   |
| `Josh's birthday party @next Friday at 18:00` | Josh's birthday party           | Friday 16 January 2015, 18:00  |
| `Christmas gifts @dec 20 at 3pm`              | Christmas gifts                 | Sunday 20 December 2015, 15:00 |
| `My brother's wedding next month @June 22`    | My brother's wedding next month | Monday 22 June 2015            |
| `Renew the passport @in 3 weeks`              | Renew the passport              | Monday 26 January 2015, 09:00  |

The `@` is what keeps _"next month"_ in the wedding's text instead of moving its date. It was a grammar, not a language model: Sugar knew a fixed set of expressions and had no word for `noon`, for example. The core of the directive, [as it was in 2016](https://github.com/ioanlucut/reme/blob/original-2016/src/app/common/directives/nlpDateDirective.js), which Reme 2.0 [imported from the first version](https://github.com/ioanlucut/reme/commit/78ac2ce):

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

In 2026 it learned three things:

- Without an `@`, it takes the longest run of words at the end of the sentence that reads as a date from today on. `Read chapter 5` stays a plain reminder, because a bare number isn't taken as a date.
- A day without a time keeps the time already picked.
- An `@` inside an email address isn't taken as the separator.

</details>

<details>
<summary><b>How the app is built</b></summary>

Reme is an AngularJS 1.3 single-page app: about 4,800 lines of JavaScript in 93 files, plus 3,600 lines of SCSS on top of Bootstrap 3.

- **Modules.** `remeSite` (landing, about, privacy and error pages), `remeAccount` (sign-up, login, password reset, profile and preferences), `remeReminders` (the list and the create, edit and delete dialogs) and `remeCommon` (shared directives, filters, interceptors and the session), routed with `ui-router`.
- **Sign-up by email.** The landing page asks only for an email address. The account is created from the link in the verification email, with the timezone detected by `jstz`.
- **Stateless auth.** The API returned a JWT in the `authtoken` header. An `$http` interceptor sends it back as a `Bearer` token, and another converts between camelCase and the API's snake_case JSON.
- **The demo.** The original API is gone, so [`src/demo/mock-api.js`](src/demo/mock-api.js) answers the same routes in the browser through AngularJS's own `ngMockE2E`, and keeps its data in `localStorage`. [`src/demo/demo.js`](src/demo/demo.js) signs every visitor in as a demo user.

```
src/app/       the app, one folder per module
src/demo/      the in-browser stand-in for the API (2026)
src/sass/      global styles on top of Bootstrap 3
src/template/  overrides for the angular-ui-bootstrap templates
scripts/       build.mjs and serve.mjs (2026)
e2e/           Playwright tests (2026)
vendor/        angular-flash 0.1.14, which is not on npm
```

</details>

<details>
<summary><b>What changed in 2026</b></summary>

|              | 2016                                                      | 2026                                                                                       |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Build        | gulp 3, bower, Ruby Sass, PhantomJS                       | One dependency-free Node script ([`scripts/build.mjs`](scripts/build.mjs)) and Dart Sass   |
| Dependencies | bower packages, two of whose repositories no longer exist | npm, pinned to the 2015 versions or the nearest published ones; one vendored file          |
| Backend      | Reme's API at `api.reme.io`                               | An in-browser stand-in for the same API, with no sign-up                                   |
| Tests        | 17 Jasmine specs on Karma and PhantomJS                   | The same 17 on headless Chrome, 8 new ones, and Playwright end-to-end tests, on every push |
| Analytics    | Mixpanel and Intercom                                     | Stubbed out; nothing leaves the browser                                                    |

Fixed along the way:

- **List limit.** The filter that limits the list to five reminders removed items from shared, cached groups while looping over them. It's now pure and sorted by due date.
- **Group order.** Groups were sorted by a reference date that put "This month" (now) before "Tomorrow" (now plus a day). They're now ordered by their earliest reminder.
- **2018 date limit.** A `max-date="2018-01-01"` carried over from the first Reme.
- **Layout.** An overflowing header button; on phones, settings tabs over the logo, "How it works" icons cut in half, and tooltips that widened the page.
- **Dead links.** Links to retired social accounts and to a contact domain that has since changed hands, plus two Romanian placeholders. The dead Proxima Nova Typekit kit is replaced by [Figtree](https://fonts.google.com/specimen/Figtree).
- **History.** Deploy credentials and personal data were removed from every commit. All 919 commits from 2014–2016 and their authors are kept, and the code as it was in 2016 is at the [`original-2016`](https://github.com/ioanlucut/reme/tree/original-2016) tag.

| Command            | What it does                                                        |
| ------------------ | ------------------------------------------------------------------- |
| `npm start`        | Build, serve on port 3000, and rebuild on every change under `src/` |
| `npm run build`    | Build into `dist/`; add `-- --base /reme/` to serve from a sub-path |
| `npm test`         | Build, then run the Jasmine unit tests in headless Chrome           |
| `npm run test:e2e` | Run the Playwright end-to-end tests                                 |

</details>

<details>
<summary><b>Timeline</b></summary>

<img src="docs/images/2015-landing.png" alt="The Reme 2.0 landing page from its 2015 press kit: 'Create email reminders in seconds!' with an email field and a 'Get started for FREE!' button" width="100%">

- **27 February 2014.** The first Reme, a single page with no sign-up, is featured on Product Hunt and finishes #6 of the day. The Wayback Machine [first captures it](https://web.archive.org/web/20140302100921/http://reme.io/) on 2 March, and dotTech reviews it on 8 April.
- **15 November 2014.** Work on Reme 2.0 starts, with 501 commits by the end of the year.
- **17 January 2015.** Reme 2.0 goes live (`v2.0.0`), with fixes up to `v2.0.4` on 2 February.
- **February 2016.** Deployment moves to S3 and CloudFront (`v2.1.5`).
- **May 2016.** The last redesign: a video landing page and a new reminders list.
- **2026.** The revival.

</details>

## License

[MIT](LICENSE) © 2014–2026 Ioan Lucuț, Sorin Pantiș and Tamás Pap
