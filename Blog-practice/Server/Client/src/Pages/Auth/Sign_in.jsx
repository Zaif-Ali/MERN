import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store";
import { ErrorNotification } from "../../toastify/noti";

const Sign_in = () => {
  const [inputvalues, setinputvalues] = useState({
    email: "",
    password: "",
  });
  const [color, setcolor] = useState("gray");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SubmitRequest = async () => {
    const res = await axios
      .post("http://localhost:3000/user/signin", inputvalues)
      .catch((error) => {
        console.log(error);
        console.log(error.request.responseText);
        ErrorNotification(error.request.responseText)
        setcolor("red");
      });
    if (!res) {
      return -1;
    } else {
      const data = await res.data;
      // console.log(data);
      localStorage.setItem("userId", data.user._id);
      // const id = localStorage.getItem("userId");
      // console.log(id);
      dispatch(authActions.login());
      navigate("/allBlogs");
    }
  };
  
  const HandleSubmit = (e) => {
    e.preventDefault();
    SubmitRequest();
  };
  const handleInput = (e) => {
    setinputvalues((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
        <Link to={"/allBlogs"} className="flex items-center mb-6 ">
          <img
            className="w-11 h-12 mr-2 "
            src="/assets/javascript-logo.png"
            alt="js-logo"
          />
          <span className="text-2xl font-bold text-white ">BlogsBackend</span>
        </Link>

        <div
          className={`w-full  rounded-2xl shadow-2xl shadow-gray-700/95 dark:border-4 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900/50 dark:border-${color}-500 `}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={handleInput}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handleInput}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>

              <button
                onClick={HandleSubmit}
                type="submit"
                className="w-full text-gray-100  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-600/95 "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Sign_in;
