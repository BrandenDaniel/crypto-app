import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./Sass/App.scss";

import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

const App = () => {
  return (
    <div className="app">
      <nav className="nav">
        <Navbar />
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <footer className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crytoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
};

export default App;
