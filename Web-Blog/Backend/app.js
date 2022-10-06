// const express = require("express");
// const mongoose = require("mongoose");
// const { default: router } = require("./routes/user-routes");
import  express  from "express";
import mongoose from "mongoose";
import Blog_router from "./routes/blog-routess";
import router from "./routes/user-routes";
import cors from 'cors'
const app = express();
const PortNumber = process.env.PORT || 5000;
app.use(cors()); 
app.use(express.json());
app.use("/api/user",router); //? telling we are using router 
app.use("/api/blog",Blog_router); //? telling we are using router for blogs also

// * connected to the mongodb atlas cluster
mongoose
  .connect(
    "mongodb+srv://huzaifamajeed:huzaifamajeed@cluster0.ewuzfsv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PortNumber);
  })
  .then(() => {
    console.log(
      `DataBase Connected and server running at the port ${PortNumber}`
    );
  })
  .catch((error) => {
    console.log("Some problem occured", error);
  });

  