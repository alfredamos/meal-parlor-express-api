import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import prisma from "./prisma.db";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Role, User } from "@prisma/client";
import { EditProfileModel } from "../models/auth/editProfile.model";
import { LoginModel } from "../models/auth/login.model";
import { SignupModel } from "../models/auth/signup.model";
import { ResponseAuth } from "../models/auth/CookieResponse.model";
import { UserResponseModel } from "../models/users/userResponse.model";
import { LoginResponse } from "../models/auth/loginResponse.model";
import { ChangePasswordModel } from "../models/auth/changePassword.model";

export class AuthDb {
  constructor() {}

  async changePassword(changePasswordModel: ChangePasswordModel) {
    //----> Destructure the payload.
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordModel;

    //----> Check for password match
    if (!this.matchPassword(newPassword, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await this.getUserByEmail(email);

    //----> Check that the old password is correct.
    const isMatch = await this.comparePassword(oldPassword, user);
    if (!isMatch) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials ");
    }

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(newPassword);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...user, password: hashNewPassword },
      where: { email },
    });

    const { role, password, ...rest } = updatedUser;

    return rest;
  }

  async currentUser(id: string) {
    //----> Retrieve the current user from the database.
    const currentUser = await this.getUserById(id);

    //----> Remove role and password from the user object.
    const { password, ...rest } = currentUser;

    return rest;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    //----> Destructure the payload.
    const { email, password, ...rest } = editProfileModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    const isMatch = await this.comparePassword(password, user);

    //----> Store the updated user in the database.
    const updatedUser = await prisma.user.update({
      data: { ...rest, password: user.password },
      where: { email },
    });

    const { role, password: userPassword, ...restOfData } = updatedUser;

    return restOfData;
  }

  async login(loginModel: LoginModel) {
    //----> Destructure the payload.
    const { email, password } = loginModel;

    //----> Get the user from database.
    const user = await this.getUserByEmail(email);

    //----> Compare the new password with old password.
    const isMatch = await this.comparePassword(password, user);

    //----> Get json web token.
    const token = this.getJsonToken(user.id, user.name, user.role);

    const { password: userPassword, ...restOfData } = user;

    const authRes: ResponseAuth = {
      id: user?.id,
      name: user?.name,
      image: user?.image as string,
      token,
      role: user?.role,
      isLoggedIn: true,
      isAdmin: user?.role === Role.Admin,
    };

    const loginRes: LoginResponse = {
      authResponse: authRes,
      currentUser: user as UserResponseModel,
    };

    return loginRes;
  }

  async signup(signupModel: SignupModel) {
    //----> Destructure the payload.
    const { email, password, confirmPassword, ...rest } = signupModel;

    //----> Check for password match, check for existence of user.
    await this.signupUtil(confirmPassword, email, password);

    //----> Hash the new password.
    const hashNewPassword = await this.passwordHarsher(password);

    //----> Store the new user in the database.
    const newUser = await prisma.user.create({
      data: { ...rest, password: hashNewPassword, email },
    });

    const { password: userPassword, ...restOfData } = newUser;

    return restOfData;
  }

  private matchPassword(newPassword: string, oldPassword: string) {
    const isMatch = newPassword.normalize() === oldPassword.normalize();

    return isMatch;
  }

  private async getUserById(id: string) {
    //----> Get the user.
    const user = await prisma.user.findUnique({
      where: { id },
    });
    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async getUserByEmail(email: string) {
    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (!user) {
      throw catchError(StatusCodes.NOT_FOUND, "Invalid credentials!");
    }

    return user;
  }

  private async comparePassword(oldPassword: string, user: User) {
    //----> Compare the new password with old password.
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    //----> Check if the two passwords match.
    if (!isMatch) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    return isMatch;
  }

  private async passwordHarsher(newPassword: string) {
    //----> Hash the new password.
    return await bcrypt.hash(newPassword, 12);
  }

  private async signupUtil(
    confirmPassword: string,
    email: string,
    password: string
  ) {
    //----> Check for password match
    if (!this.matchPassword(password, confirmPassword)) {
      throw catchError(StatusCodes.BAD_REQUEST, "Password must match!");
    }

    //----> Get user from database.
    const user = await prisma.user.findUnique({ where: { email } });

    //----> Check for existence of user.
    if (user) {
      throw catchError(StatusCodes.BAD_REQUEST, "User already exists!");
    }
  }

  private getJsonToken(id: string, name: string, role: Role) {
    const token = jwt.sign(
      {
        id,
        name,
        role,
      },
      process.env.JWT_TOKEN_CODE!,
      { expiresIn: "24hr" }
    );

    return token;
  }
}

export const authDb = new AuthDb();
