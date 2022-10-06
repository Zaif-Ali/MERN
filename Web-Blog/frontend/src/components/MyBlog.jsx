import axios from "axios";
import React, { useEffect, useState } from "react";
import EachBlog from "./EachBlog";

const MyBlog = () => {
  const [user, setuser] = useState();
  const userid = localStorage.getItem("userId");
  const GetRequest = async () => {
    let res = await axios
      .get(`http://localhost:5000/api/blog/user/${userid}`)
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };

  const CallBlogs = () => {
    GetRequest().then((data) => setuser(data.user));
  };

  useEffect(() => {
    CallBlogs();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2 mt-2">
        {user &&
          user.blogs &&
          user.blogs.map((blog, index) => (
            <EachBlog
              CallBlogs={CallBlogs}
              key={index}
              id={blog._id}
              isUser={localStorage.getItem("userId") === user._id}
              title={blog.title}
              description={blog.description}
              userName={user.name}
            />
          ))}
      </div>
    </>
  );
};

export default MyBlog;
