import { Link, useNavigate } from "react-router-dom";
import HR from "./HR";
const EachBlog = ({ title, ShortDescription, userName, BlogId }) => {
 // getting user name and slipt into array and combine them for sending into the url
  const namearray = userName.split(" ");
  let name = "";
  for (let index = 0; index < namearray.length; index++) {
    name = name + namearray[index];
  }
  return (
    <Link to={`/${name}-Blog/${BlogId}`}>
      <div
        className="bg-slate-800 h-52 flex flex-col justify-center text-center space-y-2 hover:border-1 
            border-gray-200 rounded-lg transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300
            hover:shadow-gray-500/40 shadow-2xl
            "
      >
        <div className="text-lg text-gray-100/90 p-2 font-semibold ">
          {title}
        </div>
        <HR />
        <div className=" text-gray-300/90 text-base px-2 py-1">
          {ShortDescription}
          <br />
          <span className="text-gray-200 text-sm font-semibold">
            ... Read more
          </span>
        </div>
        <HR />
        <div className="flex flex-row space-x-1 items-center justify-center p-2">
          <div className="text-base text-gray-100/80 font-semibold">
            {userName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EachBlog;
