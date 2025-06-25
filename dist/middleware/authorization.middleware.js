"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = authorizationMiddleware;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
function authorizationMiddleware(...roles) {
    return (req, res, next) => {
        const token = req["user"];
        const role = token?.role;
        const isCorrectRole = roles.includes(role);
        if (!isCorrectRole) {
            throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to view or perform this task!");
        }
        next();
        return isCorrectRole;
    };
}
