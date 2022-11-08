import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ErrorNotification = (text,time) => {
  toast.error(text, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    });
};
export const Published = (text,time) => {
  toast.success(text, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    });
};