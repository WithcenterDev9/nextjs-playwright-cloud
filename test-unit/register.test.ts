import { describe, it } from "node:test";
import assert from "assert";
import { validateRegisterForm } from "@/app/components/functions/authfunctions";
import { faker } from "@faker-js/faker";


describe("Test for the register functions", () => {
    it("should validate a empty username", () => {
        const result = validateRegisterForm(
            "",
            faker.internet.email(),
            faker.internet.password()
        );

        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, 'Username is required');
    })

    it("should validate if a username have a whitespace", () => {
        const result = validateRegisterForm(
            "user name",
            faker.internet.email(),
            faker.internet.password()
        );

        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, "Username cannot contain spaces");
    });

    it("should validate a below 3 characters in a username", () => {
        const result = validateRegisterForm(
            "as",
            faker.internet.email(),
            faker.internet.password()
        );

        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, "Username must be at least 3 characters");
    })

    it("should validate a empty email", () => {
        const result = validateRegisterForm(
            faker.internet.username(),
            "",
            faker.internet.password()
        );

        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, "Email is required")

    });

    it("should validate a empty password", () => {
        const result = validateRegisterForm(
            faker.internet.username(),
            faker.internet.email(),
            ""
        );
        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, "Password is required")
    });

    it("should validate a 6 below character password", () => {
        const result = validateRegisterForm(
            faker.internet.username(),
            faker.internet.email(),
            faker.internet.password({ length: 3 })
        );
        assert.equal(result.isValid, false);
        assert.equal(result.status?.statusMsg, "Password must be at least 6 characters")
    });

    it("should be validated when all inputs are correct", () => {
        const result = validateRegisterForm(
            faker.internet.username(),
            faker.internet.email(),
            faker.internet.password()
        );
        assert.equal(result.isValid, true);
        assert.equal(result.status?.statusMsg, "Registration successful!")
    })

});