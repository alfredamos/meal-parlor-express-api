"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailSchema = void 0;
const zod_1 = require("zod");
exports.orderDetailSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    itemName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    image: zod_1.z.string().optional(),
    menuItemId: zod_1.z.string(),
    orderId: zod_1.z.string().optional(),
});
