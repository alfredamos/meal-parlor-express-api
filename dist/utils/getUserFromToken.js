"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = getUserFromToken;
function getUserFromToken(token) {
    //----> Get the user role from the token object.
    const userRole = token?.role;
    const isName = token?.name;
    const userId = token?.id;
    return { userRole, isName, userId };
}
