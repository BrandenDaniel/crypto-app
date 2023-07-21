import { useParams } from "react-router-dom";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.supply.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="main__coinDetails">
      <div className="main__coinDetails__heading">
        <h1>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Live Price in USD
        </h1>
        <p> {cryptoDetails.description}</p>
      </div>

      <div className="main__coinDetails__stats">
        <div className="main__coinDetails__stats__card">
          <h2>{cryptoDetails.name} Statistics</h2>
          {stats.map(({ icon, title, value }) => (
            <div className="main__coinDetails__stats__info">
              <div>
                <span>{icon}</span>
                <span>{title}</span>
              </div>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="main__coinDetails__stats__card">
          <h2 className="coin-details-heading">Other statistics</h2>
          {genericStats.map(({ icon, title, value }) => (
            <div className="main__coinDetails__stats__info">
              <div>
                <span>{icon}</span>
                <span>{title}</span>
              </div>
              <p>{value}</p>
            </div>
          ))}
        </div>

        <div className="main__coinDetails__stats__card">
          <h2> {cryptoDetails.name} Links</h2>

          {cryptoDetails.links.map((link) => (
            <div className="main__coinDetails__stats__info" key={link.name}>
              <h3>{link.type}</h3>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
