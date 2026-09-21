import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('inloggen lukt met geldige gegevens', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
});

test('inloggen faalt voor een geblokkeerde gebruiker', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.foutmelding).toContainText('locked out');
});


test.describe('winkelmandje', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('twee producten toevoegen aan het winkelmandje', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

 test('prijs backpack in winkelmandje controleren', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  const backpackRegel = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
  await expect(backpackRegel).toBeVisible();
  await expect(backpackRegel.locator('.inventory_item_price')).toHaveText('$29.99');
});
});
