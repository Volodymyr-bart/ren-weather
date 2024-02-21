import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { SlLogout } from "react-icons/sl";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./GoogleAuth.css";

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

  const fetchData = async (user) => {
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
        <button onClick={() => login()} className="btn-google">
          <FcGoogle />
          Sign in with Google
        </button>
      )}
    </div>
  );
};
