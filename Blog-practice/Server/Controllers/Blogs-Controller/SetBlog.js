import mongoose from "mongoose";
import Blog from "../../models/Blog";
import User from "../../models/User";
export const AddBlog = async (request, response, next) => {
  // get data from the client side 
  const { title, description, image, user } = request.body;
   const ShortDescription = description.slice(0,35);
  // console.log(ShortDescription);
  let existingUser;
  // Get the user whose posting the Blog 
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return response.status(400).json({ message: "Unable to find user this id" });
  }
  // console.log(description);
  const blog = new Blog({
    title,
    description,
    ShortDescription,
    image,
    user,
    PublishedDate: new Date(),
  });
  try {
    // session help us to work with the multiple places
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error });
  }
  return response.status(200).json({ blog });
};
