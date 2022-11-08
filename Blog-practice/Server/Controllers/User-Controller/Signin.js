import User from "../../models/User";
import bcrypt from "bcrypt";
export const SigninUser = async (request, response, next) => {
  let existingUser;
  const { email, password } = request.body;
  try {
    existingUser = await User.findOne({email});
  } catch (error) {
    //  console.log(error);
     return;
  }
  if (!existingUser) {
    return response
      .status(404)
      .json({ message: "NoExistence" });
  }

  let Checkpassword = bcrypt.compareSync(password, existingUser.password);
  if (!Checkpassword) {
    return response.status(404).json({ message: "InvalidPassword" });
  }
  return response
    .status(200)
    .json({ message: "Signin Complete", user: existingUser });
};
