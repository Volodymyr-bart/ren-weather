import axios from "axios";
import { useState, useEffect } from "react";
// import {
// LoginSocialGoogle,
// LoginSocialAmazon,
// LoginSocialFacebook,
// LoginSocialGithub,
// LoginSocialInstagram,
// LoginSocialLinkedin,
// LoginSocialMicrosoft,
// LoginSocialPinterest,
// LoginSocialTwitter,
// LoginSocialApple,
// LoginSocialTiktok,
// IResolveParams,
// } from "reactjs-social-login";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  // FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { SlLogout } from "react-icons/sl";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./GoogleAuth.css";
// const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;

export const GoogleAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [profile, setProfile] = useLocalStorage("profile", null);
  const [isLoad, setIsLoad] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchData = async (user: any) => {
    try {
      setIsLoad(false);
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );
      setProfile(res.data);
      setIsLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {isLoad ? (
        <>
          <button onClick={logOut}>
            <SlLogout />
            Log out
          </button>
          <img src={profile?.picture} alt="user" />
          <p>Welcome: {profile?.name}</p>
          <p>Email: {profile?.email}</p>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <GoogleLoginButton
            style={{ width: "300px" }}
            onClick={() => login()}
          />
          {/* <LoginSocialFacebook
            appId="310910818648684"
            onResolve={(response) => console.log(response)}
            onReject={(error) => console.log(error)}
          >
            <FacebookLoginButton
              style={{ width: "300px" }}
              // onClick={() => alert("Login with facebook")}
            />
          </LoginSocialFacebook> */}
        </div>
      )}
    </div>
  );
};
