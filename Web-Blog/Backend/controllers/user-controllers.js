// const { default: User } = require("../models/User");
import User from "../models/User";
import bcrypt from "bcryptjs";
// Get All Users
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    res.status(404).json({ message: "No User found" });
  }
  return res.status(200).json({ users });
};
// signup user
export const SignUpUser = async (req, res, next) => {
  // get data from the user
  const { name, email, password } = req.body;
  // variable for check user already present or not
  let ExistingUsers;
  try {
    ExistingUsers = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (ExistingUsers) {
    return res
      .status(400)
      .json({
        message: "User Already Exists! Lohin instead of this",
        user: ExistingUsers,
      });
  }
  // hashing the password
  const hashedPassword = bcrypt.hashSync(password);
  // create new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

// login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let ExistingUsers;
  try {
    ExistingUsers = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!ExistingUsers) {
    return res.status(400).json({ message: "User not found" });
  }
  // if user present then check the passoword was matched or not
  let PasswordCheck = bcrypt.compareSync(password, ExistingUsers.password);
  if (!PasswordCheck) {
    return res.status(404).json({ message: "Invalid Password" });
  }
  res.status(200).json({ message: "Login Successfully", user: ExistingUsers });
};
