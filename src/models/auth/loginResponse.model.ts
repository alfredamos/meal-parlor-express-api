import { UserResponseModel } from "../users/userResponse.model";
import { ResponseAuth } from "./CookieResponse.model";

export class LoginResponse{
  authResponse: ResponseAuth = new ResponseAuth();
  currentUser: UserResponseModel = new UserResponseModel();
}