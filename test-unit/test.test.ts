import { describe, it } from "node:test";
import assert from "node:assert";

describe("Testing a test from a test file", () => {
    it("should be work on this testing", () => {
        assert.equal(1 + 1, 3);
    });
});
