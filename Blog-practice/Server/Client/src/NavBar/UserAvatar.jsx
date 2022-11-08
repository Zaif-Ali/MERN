import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";

const UserAvatar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ToggleDropDown = () => {
    var element = document.getElementById("dropdownAvatarName");
    element.classList.toggle("hidden");
  };
  const logoutUser = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('userId')
    navigate("/allBlogs");
  };
  const userId = localStorage.getItem("userId");
  const [userData, setuserData] = useState({});
  const GetUserData = async () => {
    const res = await axios.get(`http://localhost:3000/user/${userId}`);
    const data = await res.data;
    setuserData(data.user);
  };
  useEffect(() => {
    GetUserData();
  }, [userId]);
  // console.log(userData);
  return (
    <>
      <button
        onClick={ToggleDropDown}
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm font-medium text-gray-900 rounded-full dark:hover:text-yellow-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 dark:text-white ml-2  "
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className=" w-8 h-8 rounded-full"
          src="/assets/boy_similing.png"
          alt="user photo"
        />
        <svg
          className="w-4 h-4 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        id="dropdownAvatarName"
        className="hidden absolute md:right-3 z-10 w-44 bg-white rounded-xl divide-y divide-gray-100 shadow dark:bg-gray-900 dark:divide-gray-600 mt-3 transform border border-gray-500"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="bottom"
      >
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
          {userData && (
            <div>
              <div className="text-base text-gray-100 ">{userData.name}</div>
              <div className="text-xs text-gray-300">{userData.email}</div>
            </div>
          )}
          <div className="flex flex-col justify-center text-left text-xs mt-2 space-y-1">
            <Link to={"/addBlog"} className="hover:text-yellow-400" >Add Blog</Link>
            <Link to={"/myBlogs"} className="hover:text-yellow-500" >{userData.name} Blog</Link>
          </div>
        </div>

        <div className="py-2 flex justify-center">
          <button
            onClick={logoutUser}
            className="rounded-xl py-2 px-4 text-sm text-gray-700 hover:bg-red-500 dark:hover:bg-red-600/90 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
};

export default UserAvatar;
