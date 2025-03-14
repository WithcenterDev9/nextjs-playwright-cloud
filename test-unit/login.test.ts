import { describe, it } from "node:test";
import assert from "node:assert";
import { validateLoginForm } from "@/app/components/functions/authfunctions";
import { faker } from "@faker-js/faker";

describe("Test for the login function", () => {
    it("should validate if there is no username", () => {
        const result = validateLoginForm(
            "",
            faker.internet.password()
        );

        assert.equal(result.isValid, false);
        assert.equal(result.status!.statusMsg, "Username is required")
    });

    it("should validate if there is no password", () => {
        const result = validateLoginForm(
            faker.internet.username(),
            ""
        );
        assert.equal(result.isValid, false);
        assert.equal(result.status!.statusMsg, "Password is required")
    })

    it("should be logged in when inputting correct credentials", () => {
        const result = validateLoginForm(
            "frederick",
            "frederickpassword"
        );

        assert.equal(result.isValid, true)
        assert.equal(result.status!.statusMsg, "Login Successful!")
    })


});