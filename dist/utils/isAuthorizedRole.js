"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorizedRole = void 0;
const authorizedRoles = ['Admin', 'User', 'Staff'];
const isAuthorizedRole = (role) => authorizedRoles.includes(role);
exports.isAuthorizedRole = isAuthorizedRole;
