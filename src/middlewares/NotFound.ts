import { Request, Response } from "express";

export const NotFoundMiddleware = (req: Request, res: Response) => {
  res.send(`
  <h1>Route does not exist ! </h1>
  <a href="/">Go Back </a>
  `);
};
