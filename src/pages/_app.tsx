import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UtilsContext } from "@/context/UtilsContext";
import { useSnackbar } from "@/hooks/useSnackbar";
import Snackbar from "@/components/Snackbar/Snackbar";

export default function App({ Component, pageProps }: AppProps) {
  const { snackbar, showSnackbar, setShowSnackbar, setSnackbar } =
    useSnackbar();

  return (
    <SessionProvider session={pageProps.session}>
      <UtilsContext.Provider
        value={{ snackbar, showSnackbar, setShowSnackbar, setSnackbar }}
      >
        <Component {...pageProps} />
        <Snackbar />
      </UtilsContext.Provider>
    </SessionProvider>
  );
}
