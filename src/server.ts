import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database";
import categoryRouter from "./routes/categoryRoute";
import ApiError from "./utils/apiError";
import globalError from "./middlewares/errorMiddleware";

dotenv.config({ path: "./config.env" });

dbConnection();

//   express app
const app: Application = express();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
console.log(`Mode is ${process.env.NODE_ENV}`);

// Mounting Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/categories", categoryRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler Middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `server is running on port ${PORT} use it with http://localhost:${PORT}`
  );
});
