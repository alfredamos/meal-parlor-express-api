import { UuidTool } from "uuid-tool";
import { Request, Response } from "express";
import { getAuthCookieAndVerified } from "./getAuthCookieAndVerified";
import { getUserFromToken } from "./getUserFromToken";
import { Role } from "@prisma/client";

export function checkForOwnershipOrAdmin(
  currentUserId: string,
  req: Request,
  res: Response
) {
  //----> Get the current user info.
  const {isAdmin, userId} = getCurrentUserInfo(req, res);

  //----> Check for same user.
  const isSameUser = UuidTool.compare(userId, currentUserId);


  return { isSameUser, isAdmin };
}

export function getCurrentUserInfo(req: Request, res: Response){
  //----> Get the jwt-token.
  const jwtToken = getAuthCookieAndVerified(req, res);

  //----> Get the user role from the token object.
  const { isName: userName, userId, userRole } = getUserFromToken(jwtToken);

  //----> Check for admin role.
  const isAdmin = userRole === Role.Admin;

  //----> Send back response.

  return { userId, userName, userRole, isAdmin };
}
