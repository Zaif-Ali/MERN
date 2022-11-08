import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailedBlog = () => {
  const blodid = useParams().id;
  const navigate = useNavigate();
  const [Blog, setBlog] = useState();
  const [userData, setuserData] = useState();
  const GetBlog = async () => {
    let res = await axios.get(`http://localhost:3000/blog/${blodid}`);
    let data = await res.data;
    setBlog(data.blog);
    const userId = data.blog.user;
    const res_user = await axios.get(`http://localhost:3000/user/${userId}`);
    const data_user = await res_user.data;
    setuserData(data_user.user.name);
  };
  useEffect(() => {
    GetBlog();
  }, []);
  // console.log(Blog);
  // console.log(userData);
  const GoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-gray-900 min-h-screen px-3.5 py-4 md:py-16 ">
        {Blog && userData && (
          <div>
            <div className="  container mx-auto flex flex-col space-y-7">
              <div className=" container  mx-0  ">
                <button
                  onClick={GoBack}
                  className="text-gray-200 flex justify-between items-center px-5 py-2 rounded-lg  font-semibold"
                >
                  <img
                    className="w-4 mr-1.5"
                    src="/assets/back.png"
                    alt="user photo"
                  />
                  Back
                </button>
              </div>
              <header className="mb-4 lg:mb-6 not-format md:pl-6 text-center md:text-justify md:ml-10">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center  text-sm text-gray-900 dark:text-white">
                    <div>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {userData}
                      </span>

                      <p className="text-base font-light text-gray-500 dark:text-gray-400">
                        <time>{Blog.PublishedDate}</time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {Blog.title}
                </h1>

                <p className="mb-3 font-light text-gray-500 dark:text-gray-400 text-lg md:text-base">
                  {Blog.description}
                </p>
              </header>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailedBlog;

