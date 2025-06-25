"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemSchema = void 0;
const zod_1 = require("zod");
exports.menuItemSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    itemName: zod_1.z.string(),
    category: zod_1.z.string(),
    price: zod_1.z.number(),
    specialTag: zod_1.z.string().optional(),
    image: zod_1.z.string(),
    description: zod_1.z.string(),
    userId: zod_1.z.string(),
});
