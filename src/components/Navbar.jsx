import React, { useState, useEffect } from "react";
import "../Sass/Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  MoneyCollectFilled,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div className="nav__logo">
        <img src={icon} alt="logo" />
        <h1>
          <Link to="/">Cryptoverse</Link>
        </h1>

        <button
          className="nav__toggler"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </button>
      </div>
      {activeMenu && (
        <div className="nav__links">
          <NavLink to="/">
            <HomeOutlined />
            Home
          </NavLink>
          <NavLink to="/cryptocurrencies">
            <FundOutlined />
            Crypto currencies
          </NavLink>
          <NavLink to="/news">
            <BulbOutlined />
            News
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
