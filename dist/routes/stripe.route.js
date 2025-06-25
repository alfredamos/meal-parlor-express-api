"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_controller_1 = require("../controllers/stripe.controller");
const cookieAuthentication_middleware_1 = require("../middleware/cookieAuthentication.middleware");
const router = express_1.default.Router();
router.route("/checkout")
    .post(cookieAuthentication_middleware_1.cookieAuthenticationMiddleware, stripe_controller_1.StripeController.paymentCheckout);
exports.default = router;
