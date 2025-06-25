"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idCheckValidationMiddleware = idCheckValidationMiddleware;
const uuid_tool_1 = require("uuid-tool");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
function idCheckValidationMiddleware(req, res, next) {
    const { id } = req.params;
    const isValidId = uuid_tool_1.UuidTool.isUuid(id);
    if (!isValidId) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid id, please provide a valid id!");
    }
    next();
}
