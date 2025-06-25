import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { isAdminRole } from "../utils/isAdminRole";
import { UuidTool } from "uuid-tool";
import { TokenJwt } from "../models/auth/TokenJwt";

export function sameUserAndAdminMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the order-id from params.
  const { userId } = req.params;

  //----> Get the user info from request.
  const user = req.user;
  const { id, role } = user as TokenJwt;

  //----> Check for admin-user.
  const isAdmin = isAdminRole(role);

  //-----> Check for same user by comparing the two use-ids.
  const isSameUser = UuidTool.compare(userId, id);

  //----> You must either be an admin or same user.
  if (!isAdmin && !isSameUser) {
    throw catchError(
      StatusCodes.UNAUTHORIZED,
      "You are not permitted on this page!"
    );
  }

  //----> Green light to proceed, all conditions met.
  next();
}