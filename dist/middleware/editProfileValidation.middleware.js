"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileValidationMiddleware = editProfileValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const auth_validation_1 = require("../validations/auth.validation");
const http_status_codes_1 = require("http-status-codes");
function editProfileValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const editProfile = req.body;
    //----> Check the validity of the change password payload.
    const validEditProfile = (0, zodSchema_validation_1.validateWithZodSchema)(auth_validation_1.editProfileSchema, editProfile);
    if (!validEditProfile) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
