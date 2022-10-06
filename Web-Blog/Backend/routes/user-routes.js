// const express = require('express');
import  express  from "express";
import { getAllUser, loginUser, SignUpUser } from "../controllers/user-controllers";

const router = express.Router(); // Get Router from the router

// setting routes for different methods

router.get("/", getAllUser);
router.post("/singnup", SignUpUser);
router.post("/login", loginUser);

export default router;