import { createContext } from "react";

export interface SnackBarType {
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface UtilsContextType {
  snackbar: SnackBarType;
  setSnackbar: (setSnackbarInfo: SnackBarType) => void;
  showSnackbar: boolean;
  setShowSnackbar: (showSnackbar: boolean) => void;
}

export const UtilsContext = createContext<UtilsContextType>({
  snackbar: {
    message: "",
    severity: "success",
  },
  setSnackbar: () => {},
  showSnackbar: false,
  setShowSnackbar: () => {},
});
