import axios from "axios";
import React, { useEffect, useState } from "react";
import EachBlog from "./EachBlog";

const AllBlogs = () => {
  const [Blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };
  const CallBlogs = () => {
    sendRequest().then((data) => setBlogs(data.blogs));
  };
  useEffect(() => {
    CallBlogs();
  }, []);
  console.log(Blogs);
  return (
    <>
      <div className="flex flex-col space-y-2 mt-2">
        {Blogs &&
          Blogs.map((blog, index) => (
            <EachBlog
              CallBlogs={CallBlogs}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              userName={blog.user.name}
            />
          ))}
      </div>
    </>
  );
};

export default AllBlogs;
