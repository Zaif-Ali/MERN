import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
const Nav = () => {
  const ToggleNavbar = () => {
    var element = document.getElementById("menu");
    element.classList.toggle("hidden");
  };
  const selector = useSelector((state) => state.isLoggedIn);
  // console.log(selector);
  return (
    <>
      <nav className="sticky top-0 p-3 bg-gray-50  border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-20 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={"/"} className="flex items-center">
            <span className="self-center text-3xl font-bold  whitespace-nowrap dark:text-white">
              BLOGSBACK
            </span>
          </Link>
          <button
            onClick={ToggleNavbar}
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="menu">
            <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0  md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 pr-4 pl-3 text-white bg-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-gray-700  md:dark:bg-transparent "
                  aria-current="page"
                >
                  All Blogs
                </Link>
              </li>
              {selector ? (
                <>
                  {" "}
                  <li>
                    <Link
                      to={"/addBlog"}
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                      "
                    >
                      Add Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/myBlogs"}
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                      "
                    >
                      My Blog
                    </Link>
                  </li>
                  <li>
                    <UserAvatar />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={"/signin"}
                      className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign in
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
