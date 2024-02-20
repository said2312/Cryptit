import React from 'react'
import {Button,Menu,Typography ,Avatar} from 'antd'
import {Link} from 'react-router-dom';
import {HomeOutlined,BulbOutlined,FundOutlined } from '@ant-design/icons';
import  icon from '../images/cryptocurrency.png'
const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>Cryptit</Link>
            </Typography.Title>
        </div>
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined/>}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined/>}>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined/>}>
            <Link to='/subsecription'>Subscription</Link>
          </Menu.Item>

        </Menu>
    </div>
  )
}

export default Navbar