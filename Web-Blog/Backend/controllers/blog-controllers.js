import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

// Get all Blogs
export const GetAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    // save all blogs in the variable
    blogs = await Blog.find().populate('user');
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};
// Get by id
export const GetBlogByID = async (req, res, next) => {
  const blogID = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogID);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog Not found " });
  }
  return res.status(200).json({ blog });
};

//Add Blog
export const AddBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  // for check the user login or not
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user this id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
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
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog });
};

// Update the Blog
export const UpdateBlog = async (req, res, next) => {
  let blog;
  const blogid = req.params.id;
  const { title, description, image } = req.body;
  try {
    blog = await Blog.findByIdAndUpdate(blogid, {
      title,
      description,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the Blog" });
  }
  return res.status(200).json({ blog });
};
// Delete Blog
export const DeleteById = async (req, res, next) => {
  const blogid = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(blogid).populate("user");
    // this line delete the blog from the user blog too
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Fail to Delete the Blog" });
  }
  return res.status(200).json({ messgage: "Successfully Deleted" });
};

export const GetByTheUserId = async (req, res, next) => {
    let userId = req.params.id;
    let userblogs;
    try {
        userblogs = await User.findById(userId).populate("blogs"); 
    } catch (error) {
        return console.log(error);
    }
    if(!userblogs){
        return res.json(404).json({message:"No Blog Found"})
    }
    res.status(200).json({user:userblogs})
};
