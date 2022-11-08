import Blog from "../../models/Blog";

export const UpdateBlog = async (req, res, next) => {
  let blog;
  const blogid = req.params.id;
  const { title, description } = req.body;
  try {
    blog = await Blog.findByIdAndUpdate(blogid, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the Blog" });
  }
  return res.status(200).json({ blog });
};
