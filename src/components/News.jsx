import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";

  return (
    <>
      {!simplified && (
        <div>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </div>
      )}

      {cryptoNews.value.map((news, i) => (
        <div key={i} className="main__news__card">
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="main__news__card__title-image">
              <h2>{news.name}</h2>
              <img
                src={
                  news?.image?.thumbnail?.contentUrl ||
                  "https://bitcoinexchangeguide.com/wp-content/uploads/2018/08/Bitcoin-Blockchain-and-Cryptocurrency-News-For-August-24-VIDEO-Recap.jpg"
                }
                alt="news"
              />
            </div>
            <div className="main__news__card__desc">
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
            </div>

            <div className="main__news__card__footer">
              <div>
                <img
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt="news"
                />
                <span>{news.provider[0]?.name}</span>
              </div>
              <span>{moment(news.datePublished).startOf("ss").fromNow()}</span>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default News;
