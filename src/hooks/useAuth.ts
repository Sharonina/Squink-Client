import React from "react";
import { UserInfo } from "@/context/UserContext";
import { routes } from "@/utils/constants/routes";
import { useApi } from "./useApi";
import { useRouter } from "next/router";

export interface Authorization {
  token: string;
  expireDate: string;
}

export interface UserDetails {
  name: string;
  email: string;
  password: string;
}

const initialUser: UserInfo = {
  name: "",
  email: "",
  uuid: "",
};

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const authorization = localStorage.getItem("token");
    const { token, expireDate } = JSON.parse(authorization || "{}");

    if (token && expireDate) {
      if (new Date(expireDate) > new Date()) {
        return { token, expireDate };
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expireDate");
        return { token: "", expireDate: "" };
      }
    }
    return { token: "", expireDate: "" };
  }
  return { token: "", expireDate: "" };
};

export const useAuth = () => {
  const [authorization, setAuthorization] = React.useState<Authorization>(
    getTokenFromLocalStorage()
  );
  const [userInfo, setUserInfo] = React.useState<UserInfo>(initialUser);
  const { getWithAuthorization, postWithAuthorization } = useApi();
  const router = useRouter();

  const handleSignup = async (userDetails: UserDetails) => {
    const API = `${routes.USERS}`;
    const data = await postWithAuthorization(API, userDetails);
    console.log(data);
    setAuthorization({ token: data.token, expireDate: data.expireDate });
    router.push(routes.HOME);
  };

  const handleSignin = async (email: string, password: string) => {
    const API = `${routes.USERS}/login`;
    const data = await getWithAuthorization(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setAuthorization({ token: data.token, expireDate: data.expireDate });
    router.push(routes.HOME);
  };

  const handleLogout = () => {
    setAuthorization({ token: "", expireDate: "" });
    setUserInfo(initialUser);
  };

  React.useEffect(() => {
    localStorage.setItem("token", JSON.stringify(authorization));
  }, [authorization]);

  React.useEffect(() => {
    const getUser = async () => {
      const API = `${routes.USERS}/me`;
      const user = await getWithAuthorization(API, {
        headers: {
          Authorization: authorization.token,
        },
      });
      setUserInfo(user);
    };
    if (authorization.token) {
      getUser();
    }
  }, [authorization]);

  return {
    authorization,
    setAuthorization,
    userInfo,
    setUserInfo,
    handleLogout,
    handleSignin,
    handleSignup,
  };
};
