import { useSession } from "next-auth/react";
import { useContext } from "react";
import { UtilsContext } from "@/context/UtilsContext";

export const useApi = () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const session = useSession();
  const token = session?.data?.user?.token;
  const { setShowSnackbar, setSnackbar } = useContext(UtilsContext);

  const getWithAuthorization = async (
    url: string,
    options?: any
  ): Promise<any> => {
    const apiUrl = `${NEXT_PUBLIC_API_URL}${url}`; //ya incluye slash
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: token,
      },
      ...options, //opciones que queremos añadir al request (headers, content, etc)
    });
    const data = await response.json();
    return data;
  };

  const postWithoutAuthorization = async (
    url: string,
    body: any,
    options?: any
  ): Promise<any> => {
    try {
      const apiUrl = `${NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //saber de que tipo viene el body
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (error: any) {
      setSnackbar({
        message: error.message,
        severity: "error",
      });
      setShowSnackbar(true);
    }
  };

  const postWithAuthorization = async (
    url: string,
    body: any,
    options?: any
  ): Promise<any> => {
    try {
      const apiUrl = `${NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json", //saber de que tipo viene el body
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
      const apiUrl = `${NEXT_PUBLIC_API_URL}${url}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json", //saber de que tipo viene el body
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data;
    } catch (error: any) {
      setSnackbar({
        message: error.message,
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
  };
};
