# Playwright testsuite – SauceDemo

Geautomatiseerde end-to-end tests voor [SauceDemo](https://www.saucedemo.com), gebouwd met Playwright en TypeScript.

## Wat deze suite test

- Inloggen met geldige gegevens
- Inloggen met een geblokkeerde gebruiker (negatief scenario)
- Producten toevoegen aan het winkelmandje
- Juiste prijs per product in het winkelmandje

## Ontwerpkeuzes

**Page Object Model.** Locators en acties per pagina staan in `pages/`. Een wijziging in de UI hoeft zo maar op één plek te worden aangepast. Assertions staan bewust in de tests: de page object weet hoe je een pagina bedient, de test bepaalt wat er verwacht wordt.

**Stabiele locators.** Waar beschikbaar gebruik ik `data-test`-attributen, anders rol-gebaseerde locators zoals `getByRole`. Geen afhankelijkheid van CSS-structuur of gegenereerde klassen.

**Assertions die iets bewijzen.** De prijs wordt gecontroleerd binnen de regel van het specifieke product, niet los op de pagina. Een verkeerde koppeling tussen product en prijs wordt zo wel gevonden.

**Onafhankelijke tests.** Elke test start met een schone browsercontext. Gemeenschappelijke voorbereiding staat in `beforeEach`.

**Geen vaste wachttijden.** De suite gebruikt de auto-waiting en web-first assertions van Playwright in plaats van `waitForTimeout`.

## Uitvoeren

```bash
npm install
npx playwright install --with-deps
npx playwright test
```

Rapport bekijken: `npx playwright show-report`

## CI

Bij elke push draait de suite via GitHub Actions in Chromium, Firefox en WebKit.

## Volgende stappen

- Page objects voor inventaris en winkelmandje
- Sessie hergebruiken met `storageState`
- API-tests naast de UI-tests