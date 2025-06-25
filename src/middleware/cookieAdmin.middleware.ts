import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { isAdminRole } from "../utils/isAdminRole";
import { TokenJwt } from "../models/auth/TokenJwt";

export function cookieAdminMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the user info from request.
  const user = req.user;
  const {id, name, role} = user as TokenJwt;
  //----> Check for admin-user.
  const isAdmin = isAdminRole(role);

  //----> Validate user is admin.
  if(isAdmin && name && id){

    next();
  }else {
    throw catchError(StatusCodes.FORBIDDEN, "You are not permitted on this page!");
  }
}