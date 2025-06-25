"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidationMiddleware = changePasswordValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const auth_validation_1 = require("../validations/auth.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
function changePasswordValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const changePassword = req.body;
    //----> Check the validity of the change password payload.
    const validChangePassword = (0, zodSchema_validation_1.validateWithZodSchema)(auth_validation_1.changePasswordSchema, changePassword);
    if (!validChangePassword) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
