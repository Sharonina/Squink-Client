import { useSession } from "next-auth/react";
import { UtilsContext } from "@/context/UtilsContext";
import { useContext } from "react";

export const useApi = () => {
  const session = useSession();
  const token = session?.data?.user?.token;
  const { setShowSnackbar, setSnackbar } = useContext(UtilsContext);

  const getWithAuthorization = async (
    url: string,
    options?: any
  ): Promise<any> => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: token,
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
          Authorization: token,
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
      setSnackbar({
        message: err.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  const postWithoutAuthorization = async (
    url: string,
    body: any,
    options?: any
  ): Promise<any> => {
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
      setSnackbar({
        message: err.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  const putWithAuthorization = async (
    url: string,
    body: any,
    options?: any
  ): Promise<any> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: token,
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
      setSnackbar({
        message: err.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  const deleteWithAuthorization = async (
    url: string,
    options?: any
  ): Promise<any> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        ...options,
      });
      const data = await response.json();
      return data;
    } catch (err: any) {
      setSnackbar({
        message: err.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  return {
    getWithAuthorization,
    postWithoutAuthorization,
    postWithAuthorization,
    putWithAuthorization,
    deleteWithAuthorization,
  };
};
