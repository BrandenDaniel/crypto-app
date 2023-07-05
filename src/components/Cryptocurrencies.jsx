import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="main__search">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="main__cryptos">
        {cryptos?.map((currency) => (
          <div className="main__cryptos__card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <div className="main__cryptos__card__heading">
                <h3>{`${currency.rank}. ${currency.name}`}</h3>
                <img className="crypto-image" src={currency.iconUrl} />
              </div>

              <div className="main__cryptos__card__content">
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
