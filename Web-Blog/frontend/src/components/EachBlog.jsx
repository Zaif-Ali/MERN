import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const EachBlog = ({
  CallBlogs,
  title,
  description,
  userName,
  isUser,
  id,
}) => {
  const navigate = useNavigate();
  
  const DeleteRequest = async () => {
    const req = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => {
        return err;
      });
  };
  const EditBlog = async () => {
    navigate(`/myblogs/${id}`);
  };
  const DeleteBlog = () => {
    DeleteRequest().then(()=>{
      CallBlogs();
    })
  }
  return (
    <>
      <div className="flex flex-col space-y-2 mt-2">
        <div className="bg-purple-500 flex flex-col p-4 space-y-3 ">
          <div className="text-left font-bold text-2xl">{title}</div>
          <div
            className="text-left 
        font-semibold text-xl
        "
          >
            {description}
          </div>

          <span className="font-semibold text-xl ">{userName}</span>
          {isUser ? (
            <div className="flex flex-row justify-between items-center">
              <button
                className="bg-green-700 hover:bg-green-800 rounded-lg py-1 px-3 text-gray-300 font-semibold text-lg"
                onClick={EditBlog}
              >
                Edit
              </button>

              <button
                onClick={DeleteBlog}
                className="bg-red-700 hover:bg-red-800  rounded-lg py-1 px-2 text-gray-300 font-semibold text-lg"
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default EachBlog;
