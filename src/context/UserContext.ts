import { Authorization, UserDetails } from "@/hooks/useAuth";
import { createContext } from "react";

export interface UserInfo {
  name: string;
  email: string;
  uuid: string;
}

interface UserContextType {
  authorization: Authorization;
  setAuthorization: (token: Authorization) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  handleSignin: (email: string, password: string) => void;
  handleLogout: () => void;
  handleSignup: (userDetails: UserDetails) => void;
}

export const UserContext = createContext<UserContextType>({
  authorization: { token: "", expireDate: "" },
  setAuthorization: () => {},
  userInfo: {
    name: "",
    email: "",
    uuid: "",
  },
  setUserInfo: () => {},
  handleSignin: () => {},
  handleLogout: () => {},
  handleSignup: () => {},
});
