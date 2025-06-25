"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthCookie = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const getAuthCookie = (req, _res) => {
    //----> Get auth-cookie.
    const authCookie = req.cookies['auth'];
    //----> Check for existence of auth cookie.
    if (!authCookie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }
    //----> Extract the cookie object from string values.
    const authCookieObject = JSON.parse(authCookie);
    //----> Return the cookie-object.
    return authCookieObject;
};
exports.getAuthCookie = getAuthCookie;
