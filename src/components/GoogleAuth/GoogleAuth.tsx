/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "react-social-login-buttons";

import "./GoogleAuth.css";
interface GoogleAuthProps {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const GoogleAuth = ({ setUser }: GoogleAuthProps) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <GoogleLoginButton style={{ width: "230px" }} onClick={() => login()} />
  );
};
