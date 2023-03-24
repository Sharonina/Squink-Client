import { UtilsContext } from "@/context/UtilsContext";
import { useContext } from "react";

const Snackbar = () => {
  const { snackbar, showSnackbar } = useContext(UtilsContext);
  return (
    <div
      className={`fixed top-0 left-0 right-0 h-16 bg-pink text-white flex justify-center items-center z-50 ${
        showSnackbar && "opacity-100 visible"
      } ${!showSnackbar && "opacity-0 hidden"}`}
      data-testid="snackbar"
    >
      {snackbar.message}
    </div>
  );
};

export default Snackbar;
