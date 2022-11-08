import Blog from "../../models/Blog";

export const DeleteBlog = async (request, response, next) => {
  const id = request.params._id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save()
  } catch (error) {
    return console.log(error);
    // return response.status(500).json({ message: "Error occured in Deletion " });
  }
  if (!blog) {
    return response.status(500).json({ message: "Some error Occured" });
  }
  return response.status(200).json({ message: "Succesfully Deleted" });
};
