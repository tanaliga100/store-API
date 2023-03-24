import { NextFunction, Request, Response } from "express";
import { IQuery } from "../interfaces/products.interface";
import Products from "../models/Products";

const getAllProductsStatic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const search = "ab";
  try {
    const products = await Products.find({
      name: { $regex: search, $options: "i" },
    });
    if (products.length < 1) {
      throw new Error("No products found");
    }
    res.status(200).json({ length: products.length, products: products });
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ msg: "Products Testing Route" });
};

const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, search } = req.query;
  // sends all products if empty object
  const queryObject: IQuery = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company.toString();
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" } as unknown as string;
  }

  const products = await Products.find(queryObject);
  res.status(200).json({ length: products.length, products: products });
};

export { getAllProducts, getAllProductsStatic };
