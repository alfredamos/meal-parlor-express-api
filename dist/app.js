"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const menuItem_route_1 = __importDefault(require("./routes/menuItem.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const stripe_route_1 = __importDefault(require("./routes/stripe.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200", "http://localhost:5173"],
}));
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/menu-items", menuItem_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/stripe", stripe_route_1.default);
app.use(errorHandler_middleware_1.default);
console.log("I'm in app....");
exports.default = app;
