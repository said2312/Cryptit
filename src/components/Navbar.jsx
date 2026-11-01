import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer } from 'antd';
import {
  HomeOutlined,
  DollarOutlined,
  MenuOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const links = [
  { to: '/', label: 'Home', icon: <HomeOutlined />, end: true },
  { to: '/cryptocurrencies', label: 'Cryptocurrencies', icon: <DollarOutlined /> },
];

const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

const Navbar = ({ mode, onToggleTheme }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <img src={icon} alt="" />
          Cryptit
        </Link>

        <div className="nav-right">
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {mode === 'dark' ? <BulbOutlined /> : <BulbFilled />}
          </button>

          <button
            type="button"
            className="icon-btn nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuOutlined />
          </button>
        </div>
      </div>

      <Drawer title="Menu" placement="right" width={280} open={open} onClose={() => setOpen(false)}>
        <nav className="drawer-links" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.icon}
              {l.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </header>
  );
};

export default Navbar;