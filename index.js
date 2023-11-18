import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnetion from "./db.js";
import { userRouter } from "./Routers/UserRouter.js";
import { transactionRoute } from "./Routers/TransactionRoutes.js";

// Configuring Environment
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// App Middleweres
app.use(express.json());
app.use(cors());
dbConnetion();

// Checking
app.get("/", (req, res) => {
  res.send("Hey i am working Good");
});

/* API setup */

// User Router
app.use("/user", userRouter);

// Transaction Router
app.use("/transactions", transactionRoute);

// APP listeling port
app.listen(PORT, () => console.log(`Server Workign Good at ${PORT}`));
