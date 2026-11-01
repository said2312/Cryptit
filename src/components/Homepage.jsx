import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';

const compact = (v) => (v === undefined || v === null || v === '' ? '—' : millify(Number(v)));
const money = (v) => (compact(v) === '—' ? '—' : `$${compact(v)}`);

const Homepage = () => {
  const { data, isLoading } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;

  const items = [
    { label: 'Total market cap', value: money(stats?.totalMarketCap) },
    { label: '24h volume', value: money(stats?.total24hVolume) },
    { label: 'Coins tracked', value: compact(stats?.total) },
    { label: 'Exchanges', value: compact(stats?.totalExchanges) },
    { label: 'Markets', value: compact(stats?.totalMarkets) },
  ];

  return (
    <>
      <section className="hero">
        <h1>Crypto prices, without the noise.</h1>
        <p>Live prices, market cap and 24-hour moves for the biggest coins.</p>
        <Link to="/cryptocurrencies">
          <Button type="primary" size="large">Browse all coins</Button>
        </Link>
      </section>

      <section className="stat-band" aria-label="Global market stats">
        {items.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">
              {isLoading ? <span className="sk" style={{ width: '60%', height: 28 }} /> : s.value}
            </div>
          </div>
        ))}
      </section>

      <div className="section-head">
        <h2>Top coins</h2>
        <Link to="/cryptocurrencies" className="text-link">See all coins</Link>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Homepage;