"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    postCode: zod_1.z.string(),
    state: zod_1.z.string(),
    addressType: zod_1.z.string().optional(),
    userId: zod_1.z.string(),
});
