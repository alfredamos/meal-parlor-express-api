"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const stripe_db_1 = require("../db/stripe.db");
const order_db_1 = require("../db/order.db");
const http_status_codes_1 = require("http-status-codes");
class StripeController {
}
exports.StripeController = StripeController;
_a = StripeController;
StripeController.paymentCheckout = async (req, res) => {
    const orderPayload = req.body; //----> Get the request payload.
    const origin = req.headers.origin;
    const sessionPayload = await stripe_db_1.stripeDb.paymentCheckout(orderPayload, origin);
    //-----> If there's sessionPayload, then store the order in the database.
    if (sessionPayload?.id) {
        orderPayload.paymentId = sessionPayload?.id;
        orderPayload.orderDate = new Date();
        await order_db_1.orderDb.orderCreate(orderPayload);
    }
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json(sessionPayload);
};
