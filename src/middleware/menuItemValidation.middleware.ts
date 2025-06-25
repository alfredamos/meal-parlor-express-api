import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { MenuItem } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { menuItemSchema } from "../validations/menuItem.validation";

export function menuItemValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const menuItem = req.body as MenuItem;

  //----> Check the validity of the change password payload.
  const validMenuItem = validateWithZodSchema(menuItemSchema, menuItem);

  if (!validMenuItem) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
}
