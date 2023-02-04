import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "./database/db.js";
import userRoutes from "./routes/user-routes.js";
import bodyParser from "body-parser";
dotenv.config();
import cors from "cors";
import productRoutes from "./routes/product-routes.js";

const app = express();
app.use(cors());
app.use(bodyParser());
const PORT = process.env.PORT;
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.get("/", (req, res) => {
  res.send("FLIPKART");
});
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Listening on port ${PORT}`);
});
