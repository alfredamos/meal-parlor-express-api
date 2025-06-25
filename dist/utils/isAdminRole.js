"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminRole = void 0;
const client_1 = require("@prisma/client");
const isAdminRole = (role) => role === client_1.Role.Admin;
exports.isAdminRole = isAdminRole;
