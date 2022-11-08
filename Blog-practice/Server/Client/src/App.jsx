import React, { useEffect } from "react";
import AllBlogs from "./Pages/Blogs/AllBlogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./NavBar/Nav";
import Sign_in from "./Pages/Auth/Sign_in";
import Register from "./Pages/Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store";
import AddBlog from "./Pages/AddBlog/AddBlog";
import UserBlogs from "./Pages/Blogs/SpecificUser/UserBlogs";
import EditBlog from "./Pages/Blogs/SpecificUser/EditBlog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailedBlog from "./Pages/Blogs/BlogComponents/DetailedBlog";
const App = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <div className="">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Sign_in />} />
          <Route path="/:username-Blog/:id" element={<DetailedBlog/>} />
          {isLoggedIn ? (
            <>
              <Route path="/addBlog" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/UpdateBlog/:id" element={<EditBlog />} />
            </>
          ) : (
            <></>
          )}
        </Routes> 
        
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
