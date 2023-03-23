import express from "express";
import { getAllProducts, getAllProductsStatic } from "../controllers/Products";
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export const productRoutes = router;
