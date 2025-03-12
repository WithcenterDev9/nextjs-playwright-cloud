import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL("http://localhost:3000/");
});