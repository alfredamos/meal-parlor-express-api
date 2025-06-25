"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForOwnershipOrAdmin = checkForOwnershipOrAdmin;
exports.getCurrentUserInfo = getCurrentUserInfo;
const uuid_tool_1 = require("uuid-tool");
const getAuthCookieAndVerified_1 = require("./getAuthCookieAndVerified");
const getUserFromToken_1 = require("./getUserFromToken");
const client_1 = require("@prisma/client");
function checkForOwnershipOrAdmin(currentUserId, req, res) {
    //----> Get the current user info.
    const { isAdmin, userId } = getCurrentUserInfo(req, res);
    //----> Check for same user.
    const isSameUser = uuid_tool_1.UuidTool.compare(userId, currentUserId);
    return { isSameUser, isAdmin };
}
function getCurrentUserInfo(req, res) {
    //----> Get the jwt-token.
    const jwtToken = (0, getAuthCookieAndVerified_1.getAuthCookieAndVerified)(req, res);
    //----> Get the user role from the token object.
    const { isName: userName, userId, userRole } = (0, getUserFromToken_1.getUserFromToken)(jwtToken);
    //----> Check for admin role.
    const isAdmin = userRole === client_1.Role.Admin;
    //----> Send back response.
    return { userId, userName, userRole, isAdmin };
}
