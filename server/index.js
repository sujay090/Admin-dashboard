import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connect to DB");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("error to connect db", err.message);
  });
