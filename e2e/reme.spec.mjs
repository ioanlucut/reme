import { expect, test } from '@playwright/test';

const logIn = async (page, email = 'ada@example.com') => {
  await page.goto('/account');
  await page.getByPlaceholder(/email/i).fill(email);
  await page.getByPlaceholder(/password/i).fill('any password');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/reminders$/);
};

test('the landing page pitches Reme', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Create email reminders in seconds!' })).toBeVisible();
  await expect(page.getByText('Meet the team')).toBeVisible();
});

test('logging in lands on the upcoming reminders', async ({ page }) => {
  await logIn(page);

  await expect(page.getByText('Pay rent')).toBeVisible();
  await expect(page.getByText('Tomorrow').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /ada@example.com/ })).toBeVisible();
});

test('a reminder is created from natural language', async ({ page }) => {
  await logIn(page);

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

test('a reminder is deleted', async ({ page }) => {
  await logIn(page);

  const reminder = page.locator('.reminder', { hasText: 'Pay rent' });
  await reminder.locator('.reminder__menu__option--delete').click();
  await page.locator('.modal').getByRole('button', { name: "Don't need it anymore" }).click();

  await expect(page.locator('.reminder__title', { hasText: 'Pay rent' })).toBeHidden();
});

test('logging out returns to the landing page', async ({ page }) => {
  await logIn(page);

  await page.getByRole('button', { name: /ada@example.com/ }).click();
  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page.getByRole('heading', { name: 'Create email reminders in seconds!' })).toBeVisible();
});
