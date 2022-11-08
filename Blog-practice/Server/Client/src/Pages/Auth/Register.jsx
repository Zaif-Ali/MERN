import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ErrorNotification } from "../../toastify/noti";
const Register = () => {
  const [inputvalues, setinputvalues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch(authActions);
  const navigate = useNavigate();
  const SubmitRequest = async () => {
    if (
      inputvalues.name != "" &&
      inputvalues.email != "" &&
      inputvalues.password != ""
    ) {
      const res = await axios
        .post("http://localhost:3000/user/register", inputvalues)
        .catch((error) => {
          ErrorNotification("Fail to Register");
          console.log(error);
          console.log(error.request.responseText);
        });
      const data = await res.data;
      // console.log(data.user);
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.login());
      navigate("/allBlogs");
      console.log("done from set item");
    }
    else{
      ErrorNotification("All fields must be required");
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
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Link to={"/allBlogs"} className="flex items-center mb-6 ">
            <img
              className="w-11 h-12 mr-2 "
              src="/assets/javascript-logo.png"
              alt="js-logo"
            />
            <span className="text-2xl font-bold text-white ">BlogsBackend</span>
          </Link>

          <div className="w-full  rounded-2xl shadow-2xl shadow-gray-700/95 dark:border-4 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900/50 dark:border-gray-500">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register your new account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jhon Rick"
                    required={true}
                  />
                </div>
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
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account{" "}
                  <Link
                    to={"/signin"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
