import User from "../../models/User";
import bcrypt from "bcryptjs";

export const RegisterUser = async (request, response, next) => {
  const { name, email, password } = request.body;

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (error) {
    response.status(404).json({ message: "Error here" });
    return console.log(error);
  }
  if (existinguser) {
    return response
      .status(400)
      .json({ message: "User exist", user: existinguser });
  }
  let hashPassword = bcrypt.hashSync(password);
  let newuser = new User({
    name,
    email,
    password: hashPassword,
    blogs: [],
    JoiningDate:new Date()
  });
  try {
    await newuser.save();
  } catch (error) {
    return console.log(error);
  }
  return response
    .status(201)
    .json({ message: "account was created", user: newuser });
};
