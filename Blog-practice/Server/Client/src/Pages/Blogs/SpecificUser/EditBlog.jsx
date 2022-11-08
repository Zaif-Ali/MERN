import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [blog, setblog] = useState();
  const [Inputs, setInputs] = useState();
  const blogid = useParams().id;
  const navigate = useNavigate();
  const GetBlog = async () => {
    const res = await axios.get(`http://localhost:3000/blog/${blogid}`);
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    GetBlog().then((data) => {
      setblog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [blogid]);
  // console.log(blog);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const UpdateBlogRequest = async () => {
    let res = await axios
      .put(`http://localhost:3000/blog/update/${blogid}`, {
        title: Inputs.title,
        description: Inputs.description,
      })
      .catch((err) => {
        console.log(Inputs);
        console.log(err);
      });
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateBlogRequest().then(() => {
      navigate("/myBlogs");
    });
  };
  return (
    <>
      <div className="bg-gray-900  h-screen  items-center">
        {Inputs && (
          <form className="  py-10 px-10 md:py-14 md:px-32  flex flex-col space-y-10">
            <span className="font-bold text-3xl text-gray-100 text-center ">
              Add Your Blog here . . . .
            </span>

            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-xl font-medium text-gray-100 "
              >
                Title
              </label>
              <input
                value={Inputs.title}
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
                value={Inputs.description}
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
                className="text-white w-full md:w-fit font-semibold text-2xl bg-green-800 
       hover:bg-green-900
       rounded-lg px-5 py-2 "
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default EditBlog;
