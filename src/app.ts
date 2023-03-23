import dotenv from "dotenv";
import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import { connectDB } from "./config/connectDB";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandler";
import { NotFoundMiddleware } from "./middlewares/NotFound";
import { productRoutes } from "./routes/Products";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "SERVER ALIVE" });
});
// ROUTES
app.use("/api/v1/products", productRoutes);

// NOT FOUND MIDDLEWARE
app.use(NotFoundMiddleware);
// ERROR MIDDLEWARE
app.use(ErrorHandlerMiddleware);

// SERVER INSTANCE
const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`DB && Server ready => : ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
