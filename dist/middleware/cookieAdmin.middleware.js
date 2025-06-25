"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAdminMiddleware = cookieAdminMiddleware;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const isAdminRole_1 = require("../utils/isAdminRole");
function cookieAdminMiddleware(req, res, next) {
    //----> Get the user info from request.
    const user = req.user;
    const { id, name, role } = user;
    //----> Check for admin-user.
    const isAdmin = (0, isAdminRole_1.isAdminRole)(role);
    //----> Validate user is admin.
    if (isAdmin && name && id) {
        next();
    }
    else {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not permitted on this page!");
    }
}
