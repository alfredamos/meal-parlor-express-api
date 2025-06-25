"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sameUserAndAdminMiddleware = sameUserAndAdminMiddleware;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const isAdminRole_1 = require("../utils/isAdminRole");
const uuid_tool_1 = require("uuid-tool");
function sameUserAndAdminMiddleware(req, res, next) {
    //----> Get the order-id from params.
    const { userId } = req.params;
    //----> Get the user info from request.
    const user = req.user;
    const { id, role } = user;
    //----> Check for admin-user.
    const isAdmin = (0, isAdminRole_1.isAdminRole)(role);
    //-----> Check for same user by comparing the two use-ids.
    const isSameUser = uuid_tool_1.UuidTool.compare(userId, id);
    //----> You must either be an admin or same user.
    if (!isAdmin && !isSameUser) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not permitted on this page!");
    }
    //----> Green light to proceed, all conditions met.
    next();
}
