import express from "express";
import { DeleteBlog } from "../Controllers/Blogs-Controller/DeleterBlog";
import {
  GetBlogs,
  GetById,
  GetByTheUserId,
} from "../Controllers/Blogs-Controller/Getter";
import { UpdateBlog } from "../Controllers/Blogs-Controller/put";
import { AddBlog } from "../Controllers/Blogs-Controller/SetBlog";

const BlogsRouter = express.Router();
BlogsRouter.get("/", GetBlogs);
BlogsRouter.get("/userblogs/:_id", GetByTheUserId);
BlogsRouter.get("/:_id", GetById);
BlogsRouter.post("/addBlog", AddBlog);
BlogsRouter.put("/update/:id",UpdateBlog)
BlogsRouter.delete("/:_id", DeleteBlog);


export default BlogsRouter;
