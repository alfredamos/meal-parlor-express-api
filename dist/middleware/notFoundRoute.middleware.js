"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function notFoundRouteMiddleware(req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: `This route : ${req.url} does not exist!` });
}
exports.default = notFoundRouteMiddleware;
