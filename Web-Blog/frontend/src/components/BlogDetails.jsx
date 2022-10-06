import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const navigate= useNavigate();
  const blodid = useParams().id; // get id from the url
  const [blog, setblog] = useState();
  const [inputs, setInputs] = useState();
  // its help the user to write something in the input field
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const GetBlogDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${blodid}`)
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    GetBlogDetails().then((data) => {
      setblog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [blodid]);
  const UpdateBlog = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${blodid}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    UpdateBlog().then(() => {
      navigate("/myblogs")
    });
  };
  // console.log(blog);
  return (
    <div className="bg-slate-600 h-screen">
      {inputs && (
        <form className="  py-10 px-10 md:py-14 md:px-32  flex flex-col space-y-10 ">
          <span className="font-bold text-3xl text-white text-center ">
            Post Your Blog
          </span>

          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-xl font-medium text-gray-100 "
            >
              Title
            </label>
            <input
              value={inputs.title}
              onChange={handleChange}
              type="text"
              name="title"
              id="Title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Title "
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-lg font-medium text-gray-100 "
            >
              Description
            </label>
            <textarea
              value={inputs.description}
              onChange={handleChange}
              name="description"
              id="message"
              rows="4"
              className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Blog Description..."
              required
            ></textarea>
          </div>
          <div className=" text-center md:text-right">
            <button
              onClick={handleSubmit}
              className="text-white font-semibold text-2xl bg-green-800 
       hover:bg-green-900
       rounded-lg px-5 py-2 "
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
