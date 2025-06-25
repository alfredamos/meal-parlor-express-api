"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthCookieAndVerified = void 0;
const getAuthCookie_1 = require("./getAuthCookie");
const checkTokenValidity_1 = require("./checkTokenValidity");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const getAuthCookieAndVerified = (req, res) => {
    //----> Get the auth-cookie-object..
    const authCookieObject = (0, getAuthCookie_1.getAuthCookie)(req, res);
    //----> Get the verified token.
    //----> Get jwt-token.
    const { token } = authCookieObject;
    //----> Check for empty token.
    if (!token) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }
    //-----> Check for validity of token.
    const verifiedToken = (0, checkTokenValidity_1.checkToKenValidity)(token);
    //---->Check for empty token
    if (!verifiedToken) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }
    //----> Get token object value (consisting of id, name, role etc)
    const jwtToken = verifiedToken;
    //----> return the jwt-token-object.
    return jwtToken;
};
exports.getAuthCookieAndVerified = getAuthCookieAndVerified;
