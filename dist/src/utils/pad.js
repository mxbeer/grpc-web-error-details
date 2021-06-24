"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = void 0;
/**
 * Add paddings to a base64 string to make it valid
 * @param unpadded Base64 string without paddings
 * @returns Padded base64 string
 */
function pad(unpadded) {
    while (unpadded.length % 4 !== 0) {
        unpadded += "=";
    }
    return unpadded;
}
exports.pad = pad;
