"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemValidationMiddleware = menuItemValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const menuItem_validation_1 = require("../validations/menuItem.validation");
function menuItemValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const menuItem = req.body;
    //----> Check the validity of the change password payload.
    const validMenuItem = (0, zodSchema_validation_1.validateWithZodSchema)(menuItem_validation_1.menuItemSchema, menuItem);
    if (!validMenuItem) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
