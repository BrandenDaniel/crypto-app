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
      </main>

      <footer className="footer">
        <h3>
          Cryptoverse <br />
          All rights reserved
        </h3>
        <div>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptos</Link>
          <Link to="/news">News</Link>
        </div>
      </footer>
    </div>
  );
};

export default App;
