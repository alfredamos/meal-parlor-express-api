"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAuthenticationMiddleware = cookieAuthenticationMiddleware;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const getAuthCookieAndVerified_1 = require("../utils/getAuthCookieAndVerified");
const getUserDetails_1 = require("../utils/getUserDetails");
function cookieAuthenticationMiddleware(req, res, next) {
    //----> Get the auth-cookie-object, token and verified the token.
    const jwtToken = (0, getAuthCookieAndVerified_1.getAuthCookieAndVerified)(req, res);
    //----> Get the user role from the token object.
    const { isAuthorizedUser, userId, userName: isName, userRole } = (0, getUserDetails_1.getUserDetails)(jwtToken);
    //----> Permit or reject user.
    if (isAuthorizedUser && isName && userId) {
        req.user = { id: userId, name: isName, role: userRole };
        next();
    }
    else {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
}
