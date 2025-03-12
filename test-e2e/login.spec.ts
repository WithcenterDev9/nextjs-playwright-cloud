import { faker } from "@faker-js/faker";
import { test, expect, Page } from "@playwright/test";

test.describe("Test for login pages", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    })

    test("User cannot login if he/she input without password", async ({ page }) => {
        await checkUser(
            page,
            faker.internet.username(),
            "",
            "Password is required"
        )
    });

    test("User cannot login if he/she input without username", async ({ page }) => {
        await checkUser(
            page,
            "",
            faker.internet.password(),
            "Username is required"
        )
    });

    test("User if input the wrong credentials", async ({ page }) => {
        await checkUser(
            page,
            faker.internet.username(),
            faker.internet.password(),
            "Incorrect Credentials"
        )
    });

    test("User if input the correct credentials", async ({ page }) => {
        await checkUser(
            page,
            "frederick",
            "frederickpassword",
            "Login successful!"
        )
    })


});

async function checkUser(
    page: Page,
    username: string,
    password: string,
    statusMsg: string
) {
    await page.getByRole("textbox", { name: "Username" }).fill(username);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: statusMsg })).toBeVisible();
}