import React, { useMemo, useState } from 'react';
import millify from 'millify';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetCryptosQuery } from '../services/cryptoApi';

const formatPrice = (p) => {
  const n = Number(p);
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: n >= 1 ? 2 : 6,
  });
};

const formatCap = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? `$${millify(n)}` : '—';
};

const formatChange = (c) => {
  const n = Number(c);
  if (!Number.isFinite(n)) return '—';
  const sign = n > 0 ? '+' : n < 0 ? '−' : '';
  return `${sign}${Math.abs(n).toFixed(2)}%`;
};

const SkeletonRows = ({ n }) =>
  Array.from({ length: n }).map((_, i) => (
    <li className="coin-row" key={i} aria-hidden="true">
      <span className="rank"><span className="sk" style={{ width: 20 }} /></span>
      <div className="coin-id">
        <span className="sk" style={{ width: 36, height: 36, borderRadius: '50%', flex: 'none' }} />
        <span className="sk" style={{ width: '55%' }} />
      </div>
      <span className="num price"><span className="sk" style={{ width: '70%', marginLeft: 'auto' }} /></span>
      <span className="change"><span className="sk" style={{ width: 60, marginLeft: 'auto' }} /></span>
      <span className="num cap"><span className="sk" style={{ width: '60%', marginLeft: 'auto' }} /></span>
    </li>
  ));

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isLoading, isError, refetch } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState('');

  const coins = data?.data?.coins;
  const cryptos = useMemo(() => {
    if (!coins) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return coins;
    return coins.filter(
      (c) => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term)
    );
  }, [coins, searchTerm]);

  if (isError) {
    return (
      <div className="state-box">
        <h3>Couldn’t load prices</h3>
        <p>Check the API key in your .env file and your connection, then try again.</p>
        <Button type="primary" onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  return (
    <>
      {!simplified && (
        <>
          <div className="page-head">
            <h1>All cryptocurrencies</h1>
          </div>
          <div className="toolbar">
            <div className="search-wrap">
              <Input
                className="search-input"
                size="large"
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by name or symbol"
                aria-label="Search coins"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {!isLoading && (
              <span className="result-count">
                Showing {cryptos.length} of {coins?.length ?? 0} coins
              </span>
            )}
          </div>
        </>
      )}

      {!isLoading && cryptos.length === 0 ? (
        <div className="state-box">
          <h3>No coins match “{searchTerm}”</h3>
          <p>Try a different name or symbol.</p>
          <Button onClick={() => setSearchTerm('')}>Clear search</Button>
        </div>
      ) : (
        <ul className="coin-list">
          <li className="coin-head" aria-hidden="true">
            <span>#</span>
            <span>Coin</span>
            <span className="num">Price</span>
            <span className="num">24h</span>
            <span className="num">Market cap</span>
          </li>

          {isLoading ? (
            <SkeletonRows n={simplified ? 8 : 12} />
          ) : (
            cryptos.map((c) => {
              const up = Number(c.change) >= 0;
              return (
                <li className="coin-row" key={c.uuid}>
                  <span className="rank">{c.rank}</span>
                  <div className="coin-id">
                    <img src={c.iconUrl} alt="" width="36" height="36" loading="lazy" />
                    <div className="coin-text">
                      <div className="coin-name">{c.name}</div>
                      <div className="coin-symbol">{c.symbol}</div>
                    </div>
                  </div>
                  <span className="num price">{formatPrice(c.price)}</span>
                  <span className={`change ${up ? 'up' : 'down'}`}>{formatChange(c.change)}</span>
                  <span className="num cap">{formatCap(c.marketCap)}</span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </>
  );
};

export default Cryptocurrencies;