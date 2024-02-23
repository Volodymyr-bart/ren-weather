/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GoogleAuth } from "../GoogleAuth/GoogleAuth";
import { SlLogout } from "react-icons/sl";

import "./Header.css";
// import FacebookAuth from "../FacebookAuth/FacebookAuth";

const Header = () => {
  const [isLoad, setIsLoad] = useState(false);

  const [user, setUser] = useLocalStorage("user", null);
  const [profile, setProfile] = useLocalStorage("profile", null);
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

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
    <header className="header">
      {user && isLoad ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                src={profile?.picture}
                style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                alt="user"
              />
              <p>Welcome: {profile?.name}</p>
              <p>Your email: {profile?.email}</p>
            </div>

            <button
              onClick={logOut}
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <SlLogout />
              Log out
            </button>
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <GoogleAuth setUser={setUser} />
          {/* <FacebookAuth /> */}
        </div>
      )}
    </header>
  );
};

export default Header;
