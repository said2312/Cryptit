import React from 'react'
import {Routes,Route,Link } from 'react-router-dom'
import {Layout, Typography ,Space} from 'antd';
import { Navbar,Cryptocurrencies,Subsecription,CryptoDetails,Homepage}  from './components';
import './App.css';

const App = () => {


  return (
  <div className='app'>
<div className='navbar'>
  <Navbar/>
</div>
<div className='main'>
  <Layout>
    <div className='routes'>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/cryptocurrencies' element={<Cryptocurrencies/>} />
       <Route path='/crypto/:coinId' element={<CryptoDetails/>}/>
      <Route path='/subsecription' element={<Subsecription/>} />
    </Routes>
    </div>
  </Layout>
  <div className='footer' >
  <Typography.Title level={5} style={{color:'beige', textAlign:'center'}}>
   Cryptit Now<br/>
   copy rights@
  </Typography.Title>
  <Space>
    <Link to='/'>Homepage</Link>
<Link to='/cryptocurrencies'>Cryptocurrencies</Link>
    <Link to='/subsecription'>Subsecription</Link>

  </Space>

</div>
</div>

  </div> 
  )
}

export default App;