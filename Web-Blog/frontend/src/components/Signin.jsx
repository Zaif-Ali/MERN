import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Signin = () => {
  let navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  // its help the user to write something in the input field
  const handleChangeInput = (e) => {
    setinput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  // its send the request to the server
  const sendRequest = async () => {
    const req = await axios
      .post("http://localhost:5000/api/user/login", input)
      .catch((err) => {
        alert("Error Occurred check your email or password");
        console.log(err);
      });
      dispatch(authActions.login());
      navigate("/Blogs");
      const data = await req.data; // message come from process pass or not
      console.log('this is data');
      console.log(data);
      return data;
  };
  // click when the euser enter the sumbit button
  const handleSubmit = (e) => {
    e.preventDefault(); // its stop to refresh the page
    sendRequest().then((data)=>{
      localStorage.setItem("userId",data.user._id);
    });
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={input.email}
                    onChange={handleChangeInput}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required="1"
                    autoComplete="username"
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
                    value={input.password}
                    onChange={handleChangeInput}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="1"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-primary-700 dark:focus:ring-purple-800"
                >
                  Lets Go
                </button>
                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/Register"}
                    className="font-medium text-gray-300 hover:underline dark:text-gray-300"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
