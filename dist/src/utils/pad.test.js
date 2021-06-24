"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pad_1 = require("./pad");
describe("pad", () => {
    test("Padded String", () => {
        expect(pad_1.pad("12345===")).toBe("12345===");
    });
    test("Add 1", () => {
        expect(pad_1.pad("1234567")).toBe("1234567=");
    });
    test("Add 2", () => {
        expect(pad_1.pad("123456")).toBe("123456==");
    });
    test("Add 3", () => {
        expect(pad_1.pad("12345")).toBe("12345===");
    });
});
