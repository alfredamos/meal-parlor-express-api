import { TokenJwt } from "../models/auth/TokenJwt";
import { isAuthorizedRole } from "./isAuthorizedRole";

export function getUserDetails(jwtToken: TokenJwt) {
  const userRole = jwtToken?.role; //----> User-role
  const userName = jwtToken?.name; //----> User-name.
  const userId = jwtToken?.id; //----> User-id
  //----> Check for authorized-user.
  const isAuthorizedUser = isAuthorizedRole(userRole);

  //----> Send back the results.
  return { isAuthorizedUser, userId, userName, userRole };
}
