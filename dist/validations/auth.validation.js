"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleChangeSchema = exports.signupSchema = exports.editProfileSchema = exports.loginSchema = exports.changePasswordSchema = void 0;
const zod_1 = require("zod");
exports.changePasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    confirmPassword: zod_1.z.string(),
    newPassword: zod_1.z.string(),
    oldPassword: zod_1.z.string(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.editProfileSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    gender: zod_1.z.enum(["Male", "Female"]),
    password: zod_1.z.string(),
});
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    gender: zod_1.z.enum(["Male", "Female"]),
    confirmPassword: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.roleChangeSchema = zod_1.z.object({
    email: zod_1.z.string(),
    role: zod_1.z.enum(["Admin", "Staff", "User"]),
});
