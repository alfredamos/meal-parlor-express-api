"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidationMiddleware = signupValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const auth_validation_1 = require("../validations/auth.validation");
const http_status_codes_1 = require("http-status-codes");
function signupValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const signup = req.body;
    //----> Check the validity of the change password payload.
    const validSignup = (0, zodSchema_validation_1.validateWithZodSchema)(auth_validation_1.signupSchema, signup);
    if (!validSignup) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
