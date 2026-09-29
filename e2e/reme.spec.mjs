import { expect, test } from '@playwright/test';

const LANDING_HEADING = 'Create email reminders in seconds!';

// The demo has no sign-up or log-in: every way in signs the visitor in.
const enterApp = async (page) => {
  await page.goto('/');
  await page.getByRole('link', { name: /log in/i }).click();
  await expect(page).toHaveURL(/\/reminders$/);
};

test('the landing page pitches Reme', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: LANDING_HEADING })).toBeVisible();
  await expect(page.getByText('Meet the team')).toBeVisible();
});

test('every way in opens the app without signing up', async ({ page }) => {
  await enterApp(page);
  await expect(page.locator('.reminder__title', { hasText: 'Pay rent' })).toBeVisible();
  await expect(page.getByRole('button', { name: /you@example.com/ })).toBeVisible();

  await page.context().clearCookies();
  await page.evaluate(() => window.localStorage.clear());
  await page.goto('/');
  await page.getByRole('link', { name: /sign up/i }).click();
  await expect(page).toHaveURL(/\/reminders$/);

  await page.evaluate(() => window.localStorage.clear());
  await page.goto('/reminders');
  await expect(page.locator('.reminder__title', { hasText: 'Pay rent' })).toBeVisible();
});

test('the landing page form opens the app with the typed address', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Your Email').fill('ada@example.com');
  await page.getByRole('button', { name: /get started/i }).click();

  await expect(page).toHaveURL(/\/reminders$/);
  await expect(page.getByRole('button', { name: /ada@example.com/ })).toBeVisible();
});

test('a reminder is created from natural language', async ({ page }) => {
  await enterApp(page);

  await page.getByRole('button', { name: /create reminder/i }).click();
  const dialog = page.locator('.modal');
  await dialog.getByRole('textbox').first().fill('Water the plants @tomorrow at 7am');

  await expect(dialog.getByRole('button', { name: 'Tomorrow' })).toBeVisible();
  await expect(dialog.getByRole('button', { name: '07:00 AM' })).toBeVisible();

  await dialog.getByRole('button', { name: /create reminder/i }).click();

  await expect(dialog).toBeHidden();
  await expect(page.getByText('Water the plants')).toBeVisible();

  await page.reload();
  await expect(page.getByText('Water the plants')).toBeVisible();
});

test('a sentence without an @ still gets its date', async ({ page }) => {
  await enterApp(page);

  await page.getByRole('button', { name: /create reminder/i }).click();
  const dialog = page.locator('.modal');
  await dialog.getByRole('textbox').first().fill('Meeting tomorrow at 3pm');

  await expect(dialog.getByRole('button', { name: 'Tomorrow' })).toBeVisible();
  await expect(dialog.getByRole('button', { name: '03:00 PM' })).toBeVisible();

  await dialog.getByRole('button', { name: /create reminder/i }).click();
  await expect(page.locator('.reminder', { hasText: 'Meeting tomorrow at 3pm' })).toContainText('3:00 PM');
});

test('many new reminders are all listed once, by due date', async ({ page }) => {
  await enterApp(page);

  const create = async (text) => {
    await page.getByRole('button', { name: /create reminder/i }).first().click();
    const dialog = page.locator('.modal');
    await dialog.getByRole('textbox').first().fill(text);
    await dialog.getByRole('button', { name: /create reminder/i }).click();
    await expect(dialog).toBeHidden();
  };

  const listed = page.locator('.reminder-list').first().locator('.reminder__title');

  await create('Alpha @in 1 hour');
  await create('Beta @in 2 hours');

  // Only the five due soonest are shown before "Load more".
  await expect(listed).toHaveText(['Alpha', 'Beta', 'Pay rent', 'Demo day rehearsal', "Josh's birthday party"]);

  await create('Gamma @tomorrow at 9am');
  await create('Delta @in 3 hours');

  const loadMore = page.getByRole('button', { name: /load more/i });
  while (await loadMore.isVisible()) {
    await loadMore.click();
    await page.waitForTimeout(700);
  }

  await expect(listed).toHaveText([
    'Alpha', 'Beta', 'Delta', 'Gamma', 'Pay rent', 'Demo day rehearsal', "Josh's birthday party", 'Renew the passport',
  ]);
});

test('groups are listed in date order', async ({ page }) => {
  // A Monday early in the month: "Tomorrow" and "This month" are both populated
  await page.clock.install({ time: new Date('2026-10-05T09:10:00') });
  await page.goto('/reminders');

  await expect(page.locator('.reminder-list').first().locator('.reminder-group')).toHaveText(['Tomorrow', 'This month']);
});

test('a reminder is deleted', async ({ page }) => {
  await enterApp(page);

  const reminder = page.locator('.reminder', { hasText: 'Pay rent' });
  await reminder.locator('.reminder__menu__option--delete').click();
  await page.locator('.modal').getByRole('button', { name: "Don't need it anymore" }).click();

  await expect(page.locator('.reminder__title', { hasText: 'Pay rent' })).toBeHidden();
});

test('logging out returns to the landing page, and any button goes back in', async ({ page }) => {
  await enterApp(page);

  await page.getByRole('button', { name: /you@example.com/ }).click();
  await page.getByRole('link', { name: /logout/i }).click();
  await expect(page.getByRole('heading', { name: LANDING_HEADING })).toBeVisible();

  await page.getByRole('button', { name: /start now/i }).click();
  await expect(page).toHaveURL(/\/reminders$/);
});
