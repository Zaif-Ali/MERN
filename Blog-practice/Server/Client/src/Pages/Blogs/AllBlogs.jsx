import React, { useEffect, useState } from "react";
import EachBlog from "./BlogComponents/EachBlog";
import axios from "axios";
const AllBlogs = () => {
  const [Blogs, setBlogs] = useState();
  const GetBlogs_Request = async () => {
    const res = await axios.get("http://localhost:3000/blog").catch((error) => {
      console.log(error);
    });
    const data = await res.data;
    // return data;
    setBlogs(data.blogs);
  };
  useEffect(() => {
    GetBlogs_Request();
  }, []);
  // console.log(Blogs);
  return (
    <>
      <div className="md:h-screen  bg-gray-900">
        <div className=" grid grid-cols-1 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-4 p-5 md:p-9 ">
          {Blogs &&
            Blogs.map((blog, index) => (
              <EachBlog
                key={index}
                title={blog.title}
                ShortDescription={blog.ShortDescription}
                userName={blog.user.name}
                BlogId={blog._id}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
