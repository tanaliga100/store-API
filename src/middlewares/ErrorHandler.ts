import { NextFunction, Request, Response } from "express";

export const ErrorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message === "testing") {
    return res.status(500).json({ msg: "something went wrong" });
  }
  return res.status(404).json({ msg: err.message });
  // console.log(err);
};
