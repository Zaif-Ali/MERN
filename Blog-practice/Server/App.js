require("dotenv").config();
const path = require("path");
import express from "express";
import BlogsRouter from "./routes/Blog_Routes.js";
import cors from "cors";
const app = express();
const portNumber = process.env.PORT || 3000;
import mongoose from "mongoose";
import userRouter from "./routes/User_Router.js";
app.use(cors());
app.use(express.json());
app.use("/blog", BlogsRouter);
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(portNumber);
  })
  .then(() => {
    console.log(
      `DataBase Connected and server running at the port ${portNumber}`
    );
  })
  .catch((error) => {
    console.log("Some problem occured", error);
  });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
  });
}
