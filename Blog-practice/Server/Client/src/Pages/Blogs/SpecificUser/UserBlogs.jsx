import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogDetails from "../BlogComponents/BlogDetails";

const UserBlogs = () => {
  const [user, setuser] = useState();
  const userId = localStorage.getItem("userId");
  const GetRequest = async () => {
    const res = await axios.get(
      `http://localhost:3000/blog/userblogs/${userId}`
    );
    const data = await res.data;
    setuser(data.blog);
  };
  const GetuserBlog = () =>{
    GetRequest();
  }
  useEffect(() => {
    GetuserBlog();
  }, []);
// console.log(user);
  return (
    <div className="md:h-screen bg-gray-900">
      <div className=" grid grid-cols-1 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-4  p-5  ">
        {user &&
          user.blogs &&
          user.blogs.map((blog, index) => (
            <BlogDetails
              key={index}
              title={blog.title}
              description={blog.description}
              ShortDescription={blog.ShortDescription}
              date={blog.PublishedDate}
              blogId={blog._id}
              GetuserBlog={GetuserBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default UserBlogs;

