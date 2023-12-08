import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";

export const validate = <T extends Record<string, any>>(
  req: Request<T>,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.json({ errors: result.array() });
    return;
  }
  next();
};
