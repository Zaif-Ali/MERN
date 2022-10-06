import  express  from "express";
import { AddBlog, DeleteById, GetAllBlogs, GetBlogByID, GetByTheUserId, UpdateBlog } from "../controllers/blog-controllers";
const Blog_router = express.Router();

Blog_router.get("/",GetAllBlogs);
Blog_router.get("/:id",GetBlogByID);
Blog_router.post("/add",AddBlog);
Blog_router.put("/update/:id",UpdateBlog);
Blog_router.delete("/:id",DeleteById);
Blog_router.get("/user/:id",GetByTheUserId);

export default Blog_router;