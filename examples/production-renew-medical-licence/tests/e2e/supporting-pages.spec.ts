/**
 * Supporting pages – correcting details, and the footer pages
 *
 * A doctor whose details are wrong can correct them and carry on, and every
 * footer link leads to a real page.
 *
 * Anchors: Standard 5 (Works first time), Standard 11 (Trust, safety, confidentiality)
 */

import { test, expect } from '@playwright/test';

test.describe('Doctor corrects their details and carries on', () => {
  test('updates their email and phone, and returns to "Is this you?"', async ({ page }) => {
    await page.goto('/confirm-details.html');
    await page.getByRole('link', { name: 'My email or phone is out of date' }).click();
    await page.getByLabel('Email address').fill('new.address@example.bb');
    await page.getByLabel('Phone number').fill('246-555-0199');
    await page.getByRole('button', { name: 'Save and continue' }).click();
    await expect(page).toHaveURL(/confirm-details\.html$/);
    await expect(page.getByRole('heading', { name: 'Is this you?' })).toBeVisible();
  });

  test('personal details are sent by POST, never in the URL', async ({ page }) => {
    for (const p of ['address-override.html', 'contact-update.html', 'category-update.html', 'parish-update.html']) {
      await page.goto(`/${p}`);
      await expect(page.locator('main form')).toHaveAttribute('method', 'post');
    }
  });

  test('gives a different postal address', async ({ page }) => {
    await page.goto('/confirm-details.html');
    await page.getByRole('link', { name: 'Use a different address' }).click();
    await page.getByLabel('Address line 1').fill('12 Bay Street');
    await page.getByRole('radio', { name: 'St. Michael' }).check();
    await page.getByRole('button', { name: 'Use this address' }).click();
    await expect(page).toHaveURL(/confirm-details\.html$/);
  });

  test('corrects their parish', async ({ page }) => {
    await page.goto('/parish-update.html');
    await expect(page.getByRole('heading', { name: 'Which parish do you live in?' })).toBeVisible();
    await page.getByRole('radio', { name: 'St. Lucy' }).check();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    await expect(page).toHaveURL(/confirm-details\.html$/);
  });

  test('is told to stop if the details are someone else\'s', async ({ page }) => {
    await page.goto('/confirm-details.html');
    await page.getByRole('link', { name: "This isn't me" }).click();
    await expect(page.getByText('Do not carry on with this renewal.')).toBeVisible();
    await page.getByRole('link', { name: 'Enter your Trident ID again' }).click();
    await expect(page).toHaveURL(/id-lookup\.html$/);
  });
});

test.describe('CPD upload', () => {
  test('sends the file by POST and returns to the CPD page', async ({ page }) => {
    await page.goto('/cpd.html');
    await page.getByLabel('Upload a CPD record').setInputFiles({ name: 'record.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
    const [request] = await Promise.all([
      page.waitForRequest((r) => r.url().endsWith('/cpd.html') && r.method() === 'POST'),
      page.getByRole('button', { name: 'Upload this record' }).click(),
    ]);
    expect(request.method()).toBe('POST');
    await expect(page).toHaveURL(/cpd\.html$/);
    await expect(page.getByRole('heading', { name: 'Add your CPD records' })).toBeVisible();
  });
});

test.describe('Footer pages', () => {
  const footer = [
    { link: 'Help', heading: 'Help with renewing your licence' },
    { link: 'Privacy', heading: 'Privacy' },
    { link: 'Accessibility', heading: 'Accessibility' },
    { link: 'Contact', heading: 'Contact us' },
  ];
  for (const { link, heading } of footer) {
    test(`${link} link in the footer opens the ${link} page`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('contentinfo').getByRole('link', { name: link, exact: true }).click();
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    });
  }

  test('feedback can be sent from the alpha banner', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Tell us what you think' }).click();
    await page.getByLabel('What were you trying to do?').fill('Renew my licence');
    await page.getByLabel('What went wrong, or what could be better?').fill('Nothing');
    await page.getByRole('button', { name: 'Send feedback' }).click();
    await expect(page).toHaveURL(/feedback\.html$/);
  });
});
