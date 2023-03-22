import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const useApi = () => {
  const { authorization } = useContext(UserContext);

  const getWithAuthorization = async (
    url: string,
    options?: any
  ): Promise<any> => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authorization.token,
      },
      ...options,
    });
    const data = await response.json();
    return data;
  };

  const postWithAuthorization = async (
    url: string,
    body: any,
    options?: any
  ): Promise<any> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: authorization.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      console.error(err);
    }
  };

  const postWithoutAuthorization = async (
    url: string,
    body: any,
    options?: any
  ) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      console.error(err);
    }
  };

  const putWithAuthorization = async (
    url: string,
    body: any,
    options?: any
  ) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: authorization.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    getWithAuthorization,
    postWithoutAuthorization,
    postWithAuthorization,
    putWithAuthorization,
  };
};
