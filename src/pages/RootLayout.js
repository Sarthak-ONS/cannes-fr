import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
