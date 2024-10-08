import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import userDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/Api";
import useFavourites from "../../Hook/useFavourites";
import useBookings from "../../Hook/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(userDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    document.body.classList.add("int_white_bg", "hd-white");
    const getTokenAndRegister = async () => {
      try {
        const accessToken = await getAccessTokenWithPopup({
          audience: "https://api.realEstate.com", // API 标识符
          scope: "openid profile email",
        });
        localStorage.setItem("access_token", accessToken);
        setUserDetail((prev) => ({ ...prev, token: accessToken }));
        mutate(accessToken);
      } catch (error) {
        console.error("failed to get token", error);
      }
    };
    if (isAuthenticated) {
      getTokenAndRegister();
    }
    return () => {
      document.body.classList.remove("int_white_bg", "hd-white");
    };
  }, [isAuthenticated, getAccessTokenWithPopup, setUserDetail, mutate]);

  return (
    <>
      {!isAdminPage && <Header />}

      <div>
        <Outlet />
      </div>
      {!isAdminPage && <Footer />}
      <a data-scroll href="#wrapper" className="go-up">
        <i className="fa fa-angle-double-up" aria-hidden="true"></i>
      </a>
    </>
  );
};

export default Layout;
