"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    gender: zod_1.z.enum(["Male", "Female"]),
    role: zod_1.z.enum(["Admin", "Staff", "User"]),
    password: zod_1.z.string(),
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});
