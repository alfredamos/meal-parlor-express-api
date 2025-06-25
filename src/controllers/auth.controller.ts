import { Request, Response } from "express";
import { authDb } from "../db/auth.db";
import { StatusCodes } from "http-status-codes";
import { initialUserCredential } from "../db/initialUserCredentials";
import { ChangePasswordModel } from "../models/auth/changePassword.model";
import { EditProfileModel } from "../models/auth/editProfile.model";
import { LoginModel } from "../models/auth/login.model";
import { SignupModel } from "../models/auth/signup.model";
import { UserDb } from "../db/user.db";
import { TokenJwt } from '../models/auth/TokenJwt';

export class AuthController {
  static changePassword = async (req: Request, res: Response) => {
    //----> Get the payload.
    const changePasswordPayload = req.body as ChangePasswordModel;

    //----> Change the password and store the updated user credentials in the database.
    const userDetail = await authDb.changePassword(changePasswordPayload);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userDetail);
  };

  static editProfile = async (req: Request, res: Response) => {
    //----> Get the edit user payload.
    const editProfilePayload = req.body as EditProfileModel;

    //----> edit user profile and store it in the database.
    const editedUserDetail = await authDb.editProfile(editProfilePayload);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedUserDetail);
  };

  static login = async (req: Request, res: Response) => {
    //----> Get the user credentials from the request.
    const loginCredentials = req.body as LoginModel;

    //----> Login the user and get json web token.
    const userCredentials = await authDb.login(loginCredentials);
    
    //----> Get the authRes from userCredentials..
    const authRes = userCredentials.authResponse;
    //----> Stringified the authRes.
    const authResStringified = JSON.stringify(authRes);
    //----> Set the auth cookie.
    res.cookie('auth', authResStringified, {
      httpOnly: true
    });
    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };

  static logout = async (req: Request, res: Response) => {
    //-----> Clear the cookie.
    res.clearCookie("auth", {
      httpOnly: true
    })  
    console.log("I have logout!!!")
    //----> Return the default value of user-credentials.
    res.status(StatusCodes.OK).json(initialUserCredential);
  }

  static signup = async (req: Request, res: Response) => {
    //----> Get the user credentials from the request.
    const newUserCredentials = req.body as SignupModel;

    //----> Store the new user credentials in the database.
    const userCredentials = await authDb.signup(newUserCredentials);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };

  static currentUser = async (req: Request, res: Response) => {
    //----> Get the user info from request.
    const user = req.user;
    const {id } = user as TokenJwt;

    //----> Get the user from the database.
    const userCurrent = await UserDb.detailUser(id);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCurrent)
      
  } 

}
