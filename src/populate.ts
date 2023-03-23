import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import Products from "./models/Products";
import { prodJson } from "./products";
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Products.deleteMany();
    await Products.create(prodJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
start();
