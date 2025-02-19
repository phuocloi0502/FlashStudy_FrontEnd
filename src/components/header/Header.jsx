import React, { useEffect, useState } from "react";
import "./header.scss";
import logoWeb from "../../assets/logo_web.png";
import { Drawer, Menu } from "antd";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { IoMenu } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { AiTwotoneInsurance } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged } from "../../redux/slide/MyState";
import { isLogged } from "../../../utils/helpers";
export const Header = (props) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const items = [
    {
      key: "/",
      label: "Home",
      icon: <FaHome />,
    },
    {
      key: "tu-vung/JLPT-N1",
      label: "N1",
      icon: <TbVocabulary />,
    },
    {
      key: "tu-vung/JLPT-N2",
      label: "N2",
      icon: <TbVocabulary />,
    },
    {
      key: "tu-vung/JLPT-N3",
      label: "N3",
      icon: <TbVocabulary />,
    },
    {
      key: "tu-vung/JLPT-N4",
      label: "N4",
      icon: <TbVocabulary />,
    },
    {
      key: "tu-vung/JLPT-N5",
      label: "N5",
      icon: <TbVocabulary />,
    },
    {
      key: "account",
      label: "Tài khoản",
      icon: <RiAccountCircleFill />,
    },
  ];
  const onClick = (e) => {
    nav(e.key);
    setOpen(false);
  };
  const dispatch = useDispatch();
  //const isLogged = useSelector((state) => state.MyState.isLogged);
  const handleLogOut = () => {
    nav("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("UID");
  };
  useEffect(() => {}, [isLogged]);
  return (
    <div className="header-area">
      <Drawer
        onClose={onClose}
        open={open}
        placement="left"
        width={180}
        maskClosable={true}
      >
        <Menu
          onClick={onClick}
          style={{
            width: 220,
          }}
          defaultOpenKeys={["home"]}
          // selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Drawer>
      <div className="mobile-menu-wrap" onClick={showDrawer}>
        <IoMenu />
      </div>
      <div
        className="logo-web-area"
        onClick={() => {
          nav("/");
        }}
      >
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
          <Link to={"/tu-vung/JLPT-N1"}>N1</Link>
        </div>
        <div className="menu-item">
          <Link to={"/tu-vung/JLPT-N2"}>N2</Link>
        </div>
        <div className="menu-item">
          <Link to={"/tu-vung/JLPT-N3"}>N3</Link>
        </div>
        <div className="menu-item">
          <Link to={"/tu-vung/JLPT-N4"}>N4</Link>
        </div>
        <div className="menu-item">
          <Link to={"/tu-vung/JLPT-N5"}>N5</Link>
        </div>
        <div className="menu-item">
          <Link to={"/account"}>
            <FaUser />
          </Link>
        </div>
        <div className="menu-item sign-button">
          {" "}
          {isLogged() ? (
            <>
              <Link onClick={() => handleLogOut()} to={"/login"}>
                Log out
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>Log in</Link>
            </>
          )}
        </div>
      </div>
      <div className="log-out-wrap">
        {isLogged() ? (
          <>
            <Link onClick={() => handleLogOut()} to={"/login"}>
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Log in</Link>
          </>
        )}
      </div>
    </div>
  );
};
