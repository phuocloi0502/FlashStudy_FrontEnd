import { Button } from "antd";
import { useState } from "react";
import { Header } from "./components/header/Header";
import "./index.scss";
import { Outlet } from "react-router";
import { Footer } from "./components/footer/Footer";
function App() {
  return (
    <div className="container">
      <div className="header-wrap">
        <Header />
      </div>
      <div className="content-wrap">
        <Outlet />
      </div>
      <div className="footer-wrap">
        <Footer />
      </div>
    </div>
  );
}

export default App;
