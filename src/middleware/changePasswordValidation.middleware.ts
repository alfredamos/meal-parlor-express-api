import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from '../validations/zodSchema.validation';
import { changePasswordSchema } from "../validations/auth.validation";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { ChangePasswordModel } from "../models/auth/changePassword.model";


export function changePasswordValidationMiddleware(req: Request, res: Response, next: NextFunction){
    //----> Get the change password payload.
    const changePassword = req.body as ChangePasswordModel;

    //----> Check the validity of the change password payload.
    const validChangePassword = validateWithZodSchema(changePasswordSchema, changePassword);

    if (!validChangePassword){
        throw catchError(StatusCodes.BAD_REQUEST,  "Please provide all required values!");
    }

    next();
}