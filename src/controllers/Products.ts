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
    const products = await Products.find({ price: { $gt: 30 } })
      .sort("price")
      .select("name price");

    if (products.length < 1) {
      throw new Error("No products found");
    }
    res.status(200).json({ length: products.length, products: products });
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ msg: "Products Testing Route" });
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { featured, company, search, sort, fields, numericFilters } = req.query;
  console.log(req.query);
  try {
    // sends all products if empty object
    const queryObject: IQuery = {};

    // SORT INDIVIDUALLY::
    if (featured) {
      queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
      queryObject.company = company.toString();
    }
    if (search) {
      queryObject.name = { $regex: search, $options: "i" } as unknown as string;
    }

    let result = Products.find(queryObject);

    // USING SORT METHOD NI MONGOOSE
    if (sort) {
      if (typeof sort === "string") {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
      }
    } else {
      result = result.sort("createaAt");
    }

    // USING SELECT METHOD NI MONGOOSE
    if (fields) {
      if (typeof fields === "string") {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
      }
    }

    // SETUP THE PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ length: products.length, products: products });
  } catch (error) {
    next(error);
  }
};
export { getAllProducts, getAllProductsStatic };
