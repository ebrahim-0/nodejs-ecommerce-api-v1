import { NextFunction, Request, Response } from "express";

const globalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.operation = error.operation || false;
  error.message = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(error, res);
  } else {
    sendErrorForProd(error, res);
  }

  console.log("from global error middleware", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    console.log("in development mode from error middleware");
  }
};

const sendErrorForDev = (error: any, res: Response) => {
  return res.status(error.statusCode).json({
    message: error.message,
    error,
    stack: error.stack,
  });
};

export const sendErrorForProd = (error: any, res: Response) => {
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

export default globalError;
