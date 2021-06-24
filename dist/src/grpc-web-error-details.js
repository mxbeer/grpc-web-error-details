"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusFromError = void 0;
const base64_js_1 = require("base64-js");
const status_pb_1 = require("../lib/status_pb");
const ErrorDetailsPb = __importStar(require("../lib/error_details_pb"));
const pad_1 = require("./utils/pad");
const mapTypeUrlToErrorDetailClass = new Map([
    ["type.googleapis.com/google.rpc.RetryInfo", ErrorDetailsPb.RetryInfo],
    ["type.googleapis.com/google.rpc.DebugInfo", ErrorDetailsPb.DebugInfo],
    ["type.googleapis.com/google.rpc.QuotaFailure", ErrorDetailsPb.QuotaFailure],
    ["type.googleapis.com/google.rpc.ErrorInfo", ErrorDetailsPb.ErrorInfo],
    [
        "type.googleapis.com/google.rpc.PreconditionFailure",
        ErrorDetailsPb.PreconditionFailure,
    ],
    ["type.googleapis.com/google.rpc.BadRequest", ErrorDetailsPb.BadRequest],
    ["type.googleapis.com/google.rpc.RequestInfo", ErrorDetailsPb.RequestInfo],
    ["type.googleapis.com/google.rpc.ResourceInfo", ErrorDetailsPb.ResourceInfo],
    ["type.googleapis.com/google.rpc.Help", ErrorDetailsPb.Help],
    [
        "type.googleapis.com/google.rpc.LocalizedMessage",
        ErrorDetailsPb.LocalizedMessage,
    ],
]);
function byteArrayFromString(str) {
    return base64_js_1.toByteArray(pad_1.pad(str));
}
function statusFromError(err) {
    // to get status, we requires err['metadata']['grpc-status-details-bin']
    if (!("metadata" in err &&
        err["metadata"].get("grpc-status-details-bin") &&
        typeof err["metadata"].get("grpc-status-details-bin") === "string")) {
        // if the error does not contain status, return null
        return [null, null];
    }
    const statusDetailsBinStr = err["metadata"].get("grpc-status-details-bin");
    let bytes;
    try {
        bytes = byteArrayFromString(statusDetailsBinStr);
    }
    catch {
        // `grpc-status-details-bin` has an invalid base64 string
        return [null, null];
    }
    const st = status_pb_1.Status.deserializeBinary(bytes);
    const details = st
        .getDetailsList()
        .map((details) => parseErrorDetails(details))
        .filter((details) => !!details);
    return [st, details];
}
exports.statusFromError = statusFromError;
function parseErrorDetails(details) {
    const typeUrl = details.getTypeUrl();
    const errorDetailsClass = mapTypeUrlToErrorDetailClass.get(typeUrl);
    if (!errorDetailsClass) {
        console.warn(`grpc-web-error-details: typeUrl "${typeUrl}" is not supported`);
        return null;
    }
    return errorDetailsClass.deserializeBinary(details.getValue_asU8());
}
