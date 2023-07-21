import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="main__stats">
        <h1>Global Crypto Stats</h1>
        <div>
          <div>
            <h2>Total Cryptocurrencies</h2>
            <span>{numberWithCommas(globalStats.total)}</span>
          </div>

          <div>
            <h2>Total Exchanges</h2>
            <span>{millify(globalStats.totalExchanges)}</span>
          </div>

          <div>
            <h2>Total Market Cap</h2>
            <span>{millify(globalStats.totalMarketCap)}</span>
          </div>

          <div>
            <h2>Total 24h Volume</h2>
            <span>{millify(globalStats.total24hVolume)}</span>
          </div>

          <div>
            <h2>Total Markets</h2>
            <span>{millify(globalStats.totalMarkets)}</span>
          </div>
        </div>
      </div>

      <div className="main__top-cryptos">
        <div className="main__top-cryptos__heading">
          <h1>Top 10 Cryptocurrencies In The World</h1>

          <Link to="/cryptocurrencies">
            Show More Cryptos <ArrowRightOutlined />
          </Link>
        </div>
        <Cryptocurrencies simplified />
      </div>

      <div className="main__news">
        <div className="main__news__heading">
          <h1>Latest Crypto News</h1>
          <Link to="/news">
            Show More News <ArrowRightOutlined />
          </Link>
        </div>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;
