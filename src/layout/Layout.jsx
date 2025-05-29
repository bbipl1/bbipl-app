import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utility/ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <ScrollToTop/>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
