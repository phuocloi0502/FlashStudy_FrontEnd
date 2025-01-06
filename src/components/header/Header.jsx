import React from "react";
import "./header.scss";
import logoWeb from "../../assets/logo_web.png";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
export const Header = (props) => {
  return (
    <div className="header-area">
      <div className="logo-web-area">
        <img src={logoWeb} alt="" />
        <div className="logo-text"> Flash Study</div>
      </div>
      <div className="main-menu">
        <div className="menu-item">
          <Link to={"/"}>
            {" "}
            <span>
              {" "}
              <FaHome />
            </span>
          </Link>
        </div>
        <div className="menu-item">
          <Link to={"/tuvung"}>Từ Vựng</Link>
        </div>
        <div className="menu-item">
          <Link to={"/nguphap"}>Ngữ Pháp</Link>
        </div>
        <div className="menu-item">
          {" "}
          <Link to={"/kanji"}>Kanji</Link>
        </div>
        <div className="menu-item">
          {" "}
          <Link to={"/blog"}>Blog</Link>
        </div>
        <div className="menu-item">
          <Link to={"/account"}>
            <FaUser />
          </Link>
        </div>
        <div className="menu-item sign-button">Sign up</div>
      </div>
    </div>
  );
};
