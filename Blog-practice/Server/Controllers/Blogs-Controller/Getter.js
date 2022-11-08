import mongoose from "mongoose";
import Blog from "../../models/Blog";
import User from "../../models/User";

export const GetBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs found" });
  }
  res.status(200).json({ blogs });
};
export const GetByTheUserId = async (req, res, next) => {
  let userId = req.params._id;
  let userblogs;
  try {
    userblogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return res.status(404).json({ err: error, message: "failed" });
  }
  if (!userblogs) {
    return res.status(404).json({ message: "No Blog Found", blogs: userblogs });
  }
  return res.status(200).json({ message: "Blog Found", blog: userblogs });
};

export const GetById = async (req, res, next) => {
  let blogid = req.params._id;
  let blog;
  try {
    blog = await Blog.findById(blogid);
  } catch (error) {
    return res.status(404).json({ err: error, message: "failed" });
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found", blogs: blog });
  }
  return res.status(200).json({ message: "Blog Found", blog: blog });
};
