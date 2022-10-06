import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = () => {
  console.log("toast called");
  toast("Wow so easy!");
};
export default <ToastContainer />;
