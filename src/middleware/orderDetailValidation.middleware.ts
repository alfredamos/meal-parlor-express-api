import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { OrderDetail } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { orderDetailSchema } from "../validations/orderDetail.validation";

export function orderDetailValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const orderDetail = req.body as OrderDetail;

  //----> Check the validity of the change password payload.
  const validOrderDetail = validateWithZodSchema(
    orderDetailSchema,
    orderDetail
  );

  if (!validOrderDetail) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
}
