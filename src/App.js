import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { Navbar, Cryptocurrencies, Homepage } from './components';
import './App.css';

const palette = {
  dark: { colorBgContainer: '#161D26', colorBgElevated: '#161D26', colorBorder: '#26303D', colorText: '#E9EEF5' },
  light: { colorBgContainer: '#FFFFFF', colorBgElevated: '#FFFFFF', colorBorder: '#DDE1E7', colorText: '#121821' },
};

const getInitialMode = () => {
  try {
    const saved = localStorage.getItem('cryptit-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return 'dark';
};

const App = () => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem('cryptit-theme', mode);
    } catch (e) {
      /* storage unavailable */
    }
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#F2A93B',
          colorTextLightSolid: '#1A1204',
          borderRadius: 10,
          fontFamily: "'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif",
          ...palette[mode],
        },
      }}
    >
      <div className="app">
        <Navbar mode={mode} onToggleTheme={toggleTheme} />
        <main className="main container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>© {new Date().getFullYear()} Cryptit. Market data from Coinranking.</span>
            <nav className="footer-links" aria-label="Footer">
              <Link to="/">Home</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </nav>
          </div>
        </footer>
      </div>
    </ConfigProvider>
  );
};

export default App;