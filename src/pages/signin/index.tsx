import { isEmail, isEmpty, isPassword } from "@/utils/validations/validations";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { routes } from "@/utils/constants/routes";

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function Signin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<LoginErrors>({});
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setErrors({ ...errors, email: undefined });
    const isEmailValid = isEmail(emailValue);
    const isEmailEmpty = isEmpty(emailValue);

    if (isEmailEmpty) {
      return setErrors({
        ...errors,
        email: "Please enter an email",
      });
    }

    if (!isEmailValid) {
      return setErrors({
        ...errors,
        email: "Enter a valid email: email@domine.ext",
      });
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setErrors({ ...errors, password: undefined });
    const isPasswordValid = isPassword(passwordValue);
    const isPasswordEmpty = isEmpty(passwordValue);

    if (isPasswordEmpty) {
      return setErrors({
        ...errors,
        password: "Please enter a password",
      });
    }

    if (!isPasswordValid) {
      return setErrors({
        ...errors,
        password: "Password must be greater than 6",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push("/");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  React.useEffect(() => {
    if (errors?.email || errors?.password || !email || !password) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [errors]);
  return (
    <>
      <Head>
        <title>Squink | SignIn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center bg-white w-full h-screen">
        {errorMessage && <div>{errorMessage}</div>}
        <form
          onSubmit={handleSubmit}
          className="w-80 flex items-center justify-center flex-col"
          data-testid="login-page"
        >
          <div className="flex justify-center items-center text-4xl m-5">
            <span className="text-purple">squink</span>
          </div>
          <div className="w-full flex items-center justify-center flex-col">
            <div className="w-full mb-5">
              <p className="text-black">Email</p>
              <input
                value={email}
                onChange={handleEmailChange}
                placeholder="sr_notarin@gmail.com"
                data-testid="email-input"
                className="w-full bg-white border-b border-b-pink outline-none"
              />
              {errors?.email && (
                <p className="text-pink text-xs">{errors.email}</p>
              )}
            </div>
            <div className="w-full mb-5">
              <p className="text-black">Password</p>
              <input
                onChange={handlePasswordChange}
                placeholder="**********"
                type="password"
                value={password}
                data-testid="password-input"
                className="w-full bg-white border-b border-b-pink outline-none"
              />
              {errors?.password && (
                <p className="text-pink text-xs">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              data-testid="submit-button"
              className="p-2 bg-purple w-60 rounded-3xl text-white hover:bg-purple/80 disabled:opacity-50 disabled:hover:bg-purple"
            >
              Sign in
            </button>
            <span className="text-black mt-3 text-sm text-center">
              {`Don't have an account? `}
              <Link className="text-purple " href="/signup">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </main>
    </>
  );
}
