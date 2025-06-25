import {Request, Response, NextFunction} from "express";
import { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";

function errorHandlerMiddleware(error: HttpError, _req: Request, res: Response, next: NextFunction){
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong.";
  const name = error.name || "Internal Server Error.";

  res.status(statusCode).json({
    status: "fail",
    message,
    name,
  });
}

export default  errorHandlerMiddleware