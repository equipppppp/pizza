import React from "react";
import { Outlet } from "react-router-dom";

import Header from "components/header/header";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
