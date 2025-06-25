"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function errorHandlerMiddleware(error, _req, res, next) {
    const statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong.";
    const name = error.name || "Internal Server Error.";
    res.status(statusCode).json({
        status: "fail",
        message,
        name,
    });
}
exports.default = errorHandlerMiddleware;
