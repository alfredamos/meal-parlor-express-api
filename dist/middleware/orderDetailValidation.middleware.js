"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailValidationMiddleware = orderDetailValidationMiddleware;
const zodSchema_validation_1 = require("../validations/zodSchema.validation");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const orderDetail_validation_1 = require("../validations/orderDetail.validation");
function orderDetailValidationMiddleware(req, res, next) {
    //----> Get the change password payload.
    const orderDetail = req.body;
    //----> Check the validity of the change password payload.
    const validOrderDetail = (0, zodSchema_validation_1.validateWithZodSchema)(orderDetail_validation_1.orderDetailSchema, orderDetail);
    if (!validOrderDetail) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide all required values!");
    }
    next();
}
