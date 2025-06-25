"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    totalQuantity: zod_1.z.number(),
    isShipped: zod_1.z.boolean().optional(),
    isDelivered: zod_1.z.boolean().optional(),
    totalPrice: zod_1.z.number(),
    userId: zod_1.z.string(),
    status: zod_1.z.enum(['Delivered', 'Pending', 'Shipped'])
});
