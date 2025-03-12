import { test, expect } from '@playwright/test';

test.describe("Navigation E2E", () => {

    test.beforeEach(async ({ page }) => await page.goto('/'));
    test('Test if we redirecting to Homepage', async ({ page }) => {
        await page.goto("/about-us");

        const homeLink = page.getByRole("link", { name: "A sample website" });
        await homeLink.click();

        await expect(page).toHaveURL('/');
        await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
    });

    test('Test if we redirecting to about-us section', async ({ page }) => {
        const aboutUs = page.getByRole("link", { name: "About Us" });
        await aboutUs.click();
        await expect(page).toHaveURL("/about-us");
        await expect(page.getByRole("heading", { name: "About Us" })).toBeVisible();
    });

    test("Test if login and register ", async ({ page }) => {
        const dropdown = page.getByRole("button", { name: "Account" })
        await dropdown.click();
        await expect(page.getByText("Login")).toBeVisible();
        await expect(page.getByText("Register")).toBeVisible();

        await page.getByRole("link", { name: "Login" }).click();
        await expect(page).toHaveURL("/login")

        await dropdown.click();

        await page.getByRole("link", { name: "Register" }).click();
        await expect(page).toHaveURL("/register")
    })
})