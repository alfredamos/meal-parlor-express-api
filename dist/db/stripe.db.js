"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeDb = exports.StripeDb = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeDb {
    constructor() {
        //-----> Load stripe
        this.stripe = new stripe_1.default(process.env.STRIPE_CODE_KEY);
    }
    async paymentCheckout(orderPayload, origin) {
        //----> Destructure orderPayload.
        const { orderDetails } = orderPayload;
        const session = await this.stripe.checkout.sessions.create({
            line_items: [
                ...orderDetails?.map((cart) => ({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: cart.itemName,
                            images: [cart.image],
                        },
                        unit_amount: cart.price * 100,
                    },
                    quantity: cart.quantity,
                })),
            ],
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${origin}/orders/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/orders/payment-failure`,
            /* success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/payment-failure`, */
        });
        const { id, url, status, } = session;
        return { id, url, status };
    }
}
exports.StripeDb = StripeDb;
exports.stripeDb = new StripeDb();
