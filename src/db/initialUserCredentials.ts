import { ResponseAuth } from "../models/auth/CookieResponse.model";

export const initialUserCredential: ResponseAuth = {
  id: "",
  name: "",
  token: "",
  role: "",
  image: "",
  isAdmin: false,
  isLoggedIn: false,
};
