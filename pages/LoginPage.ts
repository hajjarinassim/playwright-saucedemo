import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly gebruikersnaam: Locator;
  readonly wachtwoord: Locator;
  readonly loginKnop: Locator;
  readonly foutmelding: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gebruikersnaam = page.getByPlaceholder('Username');
    this.wachtwoord = page.getByPlaceholder('Password');
    this.loginKnop = page.getByRole('button', { name: 'Login' });
    this.foutmelding = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(gebruiker: string, wachtwoord: string) {
    await this.gebruikersnaam.fill(gebruiker);
    await this.wachtwoord.fill(wachtwoord);
    await this.loginKnop.click();
  }
}