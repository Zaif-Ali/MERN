import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Published } from "../../toastify/noti";

const AddBlog = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const SubmitRequest = async () => {
    const res = axios
      .post("http://localhost:3000/blog/addBlog", {
        title: input.title,

        description: input.description,
        user: localStorage.getItem("userId"),
      })
      .catch((error) => {
        console.log(error);
      });
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SubmitRequest();
    // navigate("/allBlogs");
    Published("Your Post Published");
    setinput({
      title: "",
      description: "",
    });
  };
  return (
    <div className="bg-gray-900  h-screen  items-center">
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
            value={input.title}
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
            value={input.description}
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
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
