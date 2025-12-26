import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //* handle specific errors *//

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res
    .status(500)
    .send({ errors: [{ message: err.message || "Something went wrong" }] });
};
