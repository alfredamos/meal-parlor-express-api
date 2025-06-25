import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { getAuthCookieAndVerified } from "../utils/getAuthCookieAndVerified";
import { getUserDetails } from "../utils/getUserDetails";
import { TokenJwt } from "../models/auth/TokenJwt";

export function cookieAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the auth-cookie-object, token and verified the token.
  const jwtToken = getAuthCookieAndVerified(req, res); 
  
  //----> Get the user role from the token object.
  const {isAuthorizedUser, userId, userName: isName, userRole} = getUserDetails(jwtToken);

  //----> Permit or reject user.
  if (isAuthorizedUser && isName && userId){
    req.user = { id: userId, name: isName, role: userRole } as TokenJwt;
    next();
  }else{
       throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

}




