"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPayload = void 0;
const client_1 = require("@prisma/client");
class OrderPayload {
    constructor() {
        this.id = "";
        this.orderDetails = [];
        this.paymentId = "qysk47dipmdhy68";
        this.userId = "";
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.orderDate = new Date();
        this.status = client_1.Status.Completed;
    }
}
exports.OrderPayload = OrderPayload;
