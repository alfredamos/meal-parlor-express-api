import { TokenJwt } from "../models/auth/TokenJwt";

export function getUserFromToken(token: TokenJwt){
  //----> Get the user role from the token object.
  const userRole = token?.role;
  const isName = token?.name;
  const userId = token?.id;

  return {userRole, isName, userId}
}