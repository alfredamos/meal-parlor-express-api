import { Request, Response } from "express";
import { stripeDb as StripeDb } from "../db/stripe.db";
import { orderDb } from "../db/order.db";
import { StatusCodes } from "http-status-codes";
import { OrderPayload } from "../models/orders/orderPayload.model";

export class StripeController {
  static paymentCheckout = async (req: Request, res: Response) => {
    const orderPayload = req.body as OrderPayload; //----> Get the request payload.

   const origin = req.headers.origin as string;

    const sessionPayload = await StripeDb.paymentCheckout(orderPayload, origin);

    //-----> If there's sessionPayload, then store the order in the database.
    if (sessionPayload?.id) {
      orderPayload.paymentId = sessionPayload?.id;
      orderPayload.orderDate = new Date();
      await orderDb.orderCreate(orderPayload);
    }

    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(sessionPayload);
  };
}
