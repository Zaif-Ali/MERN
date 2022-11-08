import User from "../../models/User";

export const UserById = async (request, response, next) => {
  let user;
  const userId = request.params._id;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return response
      .status(404)
      .json({ message: "No user exist with this id", user: user });
  }
  return response.status(200).json({ user });
};
