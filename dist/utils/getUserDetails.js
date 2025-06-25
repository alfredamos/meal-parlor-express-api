"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = getUserDetails;
const isAuthorizedRole_1 = require("./isAuthorizedRole");
function getUserDetails(jwtToken) {
    const userRole = jwtToken?.role; //----> User-role
    const userName = jwtToken?.name; //----> User-name.
    const userId = jwtToken?.id; //----> User-id
    //----> Check for authorized-user.
    const isAuthorizedUser = (0, isAuthorizedRole_1.isAuthorizedRole)(userRole);
    //----> Send back the results.
    return { isAuthorizedUser, userId, userName, userRole };
}
