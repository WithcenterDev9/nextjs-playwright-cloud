import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Tests for register page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/register");
    })

    test("New users shouldnt be able to register when their username is below 3 characters", async ({ page }) => {
        await checks(
            page,
            faker.internet.email(),
            faker.internet.password(),
            "a",
            "Username must be at least 3"
        );
    });

    test("New users shouldnt be able to register when their username is blank", async ({ page }) => {
        await checks(
            page,
            faker.internet.email(),
            faker.internet.password(),
            "",
            "Username is required"
        );
    });


    test("New users shouldnt be able to register when their password is blank", async ({ page }) => {
        await checks(
            page,
            faker.internet.email(),
            "",
            faker.internet.username(),
            "Password is required"
        );
    });

    test("New user shouldnt be able to register when their password is below 6 length characters", async ({ page }) => {
        await checks(
            page,
            faker.internet.email(),
            faker.internet.password({ length: 4 }),
            faker.internet.username(),
            "Password must be at least 6 characters"
        );
    });

    test("New users shouldnt be able to register when their email is blank", async ({ page }) => {
        await checks(
            page,
            "",
            faker.internet.password(),
            faker.internet.username(),
            "Email is required"
        );
    });


    // test("New users shouldnt be able to register when their email isnt valid", async ({ page }) => {
    //     await checks(
    //         page,
    //         "laosdlad",
    //         faker.internet.password(),
    //         faker.internet.username(),
    //         "Please enter a valid email address"
    //     );
    // });

    test("New users should be able to register when their username, password, and email are correctly entered", async ({ page }) => {
        await checks(
            page,
            faker.internet.email(),
            faker.internet.password(),
            faker.internet.username(),
            "Registration successful!"
        );
    });



});

async function checks(
    page: Page,
    email: string,
    pass: string,
    user: string,
    statusMsg: string) {

    await page.getByRole("textbox", { name: "Username" }).fill(user);
    await page.getByRole("textbox", { name: "Email" }).fill(email)
    await page.getByRole("textbox", { name: "Password" }).fill(pass);
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByRole("heading", { name: statusMsg })).toBeVisible();

}


