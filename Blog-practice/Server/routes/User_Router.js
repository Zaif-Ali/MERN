import express from "express";
import { getUsers } from "../Controllers/User-Controller/GetterUser";
import { UserById } from "../Controllers/User-Controller/GetUserByid";
import { RegisterUser } from "../Controllers/User-Controller/Register";
import { SigninUser } from "../Controllers/User-Controller/Signin";
const userRouter = express.Router();

userRouter.get("/allusers", getUsers);
userRouter.post("/signin", SigninUser);
userRouter.post("/register", RegisterUser);
userRouter.get("/:_id", UserById);

export default userRouter;
