import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

import authRoute from "./routes/auth.route";
import menuItemRoute from "./routes/menuItem.route";
import userRoute from "./routes/user.route";
import stripeRoute from "./routes/stripe.route";
import orderRoute from "./routes/order.route";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200", "http://localhost:5173"],
  }),
);

app.use(express.urlencoded());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/menu-items", menuItemRoute);
app.use("/api/users", userRoute);
app.use("/api/stripe", stripeRoute);

app.use(errorHandlerMiddleware);
console.log("I'm in app....");


export default app;
