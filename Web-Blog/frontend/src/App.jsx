import { Route, Routes } from "react-router-dom";
import AllBlogs from "./components/AllBlogs";
import FirstHeader from "./components/FirstHeader";
import Register from "./components/Register";
import MyBlog from "./components/MyBlog";
import Signin from "./components/Signin";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/index";

function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <>
      <FirstHeader />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Blogs" element={<AllBlogs />} />
        {isLoggedIn ? (
          <>
            <Route path="/AddBlog" element={<AddBlog />} />
            <Route path="/myblogs" element={<MyBlog />} />
            <Route path="/myblogs/:id" element={<BlogDetails />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </>
  );
}

export default App;
