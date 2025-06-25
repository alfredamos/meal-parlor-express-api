"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWithZodSchema = validateWithZodSchema;
const http_status_codes_1 = require("http-status-codes");
const zod_validation_error_1 = require("zod-validation-error");
const http_errors_1 = __importDefault(require("http-errors"));
function validateWithZodSchema(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const validationError = (0, zod_validation_error_1.fromZodError)(result.error);
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${validationError}`);
    }
    return result.data;
}
