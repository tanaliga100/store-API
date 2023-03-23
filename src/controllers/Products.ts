import { NextFunction, Request, Response } from "express";
import Products from "../models/Products";

const getAllProductsStatic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Products.find({});
    res.status(200).json({ length: products.length, products: products });
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ msg: "Products Testing Route" });
};

const getAllProducts = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "Products " });
};

export { getAllProducts, getAllProductsStatic };
