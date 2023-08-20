import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constain";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="w-full flex flex-col items-center h-full">
      <Header />
      <Navigation />
      {location?.pathname !== `/${path.CONNECT}` &&
        !location?.pathname.includes("/chi-tiet") && <Search />}
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className="h-[500px]"></div>
    </div>
  );
};

export default Home;
