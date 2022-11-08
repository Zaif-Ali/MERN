import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HR from "./HR";

const BlogDetails = ({
  title,
  description,
  ShortDescription,
  date,
  blogId,
  GetuserBlog,
}) => {
  const DeleteRequest = async () => {
    let response = await axios
      .delete(`http://localhost:3000/blog/${blogId}`)
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteBlog = () => {
    DeleteRequest();
    GetuserBlog();
  };
  const navigate = useNavigate();
  const updateBlog = () => {
    navigate(`/UpdateBlog/${blogId}`);
  };
  return (
    <>
      <div className="relative block rounded-xl border-2 border-gray-700 bg-gray-800 p-8 shadow-xl  ">
        <div className=" flex justify-between  font-medium ">
          <button
          onClick={updateBlog}
          className="text-green-200 hover:text-green-400 ">Edit</button>
          <button
            onClick={DeleteBlog}
            className="text-red-300  hover:text-red-400 "
          >
            Delete
          </button>
        </div>

        <div className="mt-4 text-gray-500 sm:pr-8">
          <h3 className="mt-4 text-xl font-bold text-zinc-300/95">{title}</h3>

          <p className="mt-2  font-semibold text-sm sm:block text-gray-400">
            {date}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
