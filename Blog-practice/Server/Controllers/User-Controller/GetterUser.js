import User from "../../models/User";

export const getUsers = async (request, response, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return response.status(404).json({ message: "No Users Exits" });
  }
  return response.status(200).json({ users });
};
