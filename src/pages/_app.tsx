import { UserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const {
    authorization,
    setAuthorization,
    userInfo,
    setUserInfo,
    handleLogout,
    handleSignin,
    handleSignup,
  } = useAuth();
  return (
    <UserContext.Provider
      value={{
        authorization,
        setAuthorization,
        userInfo,
        setUserInfo,
        handleLogout,
        handleSignin,
        handleSignup,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
