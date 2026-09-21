import { test, expect } from '@playwright/test';

test('todo toevoegen en afvinken', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Playwright leren');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Boodschappen doen');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Playwright leren' }).getByRole('checkbox').check();

  await expect(page.getByTestId('todo-title')).toHaveCount(2);
  await expect(page.getByText('1 item left')).toBeVisible();
});