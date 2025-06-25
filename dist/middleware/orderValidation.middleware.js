"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationMiddleware = orderValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const order_validation_1 = require("../validations/order.validation");
const http_status_codes_1 = require("http-status-codes");
function orderValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const order = req.body;
    //----> Check the validity of the change password payload.
    const validOrder = (0, zodSchema_validation_1.validateWithZodSchema)(order_validation_1.orderSchema, order);
    if (!validOrder) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
