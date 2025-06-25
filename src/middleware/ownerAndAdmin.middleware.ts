import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { isAdminRole } from "../utils/isAdminRole";
import { UuidTool } from "uuid-tool";
import { orderDb } from "../db/order.db";
import { TokenJwt } from "../models/auth/TokenJwt";

export async function ownerAndAdminMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the order-id from params.
  const { orderId } = req.params;

  //----> Get the user info from request.
  const user = req.user;
  const { id: userId, role } = user as TokenJwt;

  //----> Check for admin-user.
  const isAdmin = isAdminRole(role);

  const order = await orderDb.getOneOrder(orderId);

  //----> Get the user-id attached to the order.
  const userIdFromOrder = order?.userId;

  //-----> Check for same user by comparing the two use-ids.
  const isOwner = UuidTool.compare(userId, userIdFromOrder);

  //----> You must either be an admin or same user.
  if (!isAdmin && !isOwner) {
    throw catchError(
      StatusCodes.UNAUTHORIZED,
      "You are not permitted on this page!"
    );
  }

  //----> Green light to proceed, all conditions met.
  next();
}