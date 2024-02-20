
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Subsecription = ({ simplified }) => {
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  const handleReadMoreClick = () => {
    setShowSubscriptionForm(true);
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/subscribe', values);
      alert(' you successfully subscribed to news');
    } catch (error) {
      console.error(error);
      alert('Subscription failed. Please try again');
    }
  };

  return (
    <div>
      <Title level={2}>News</Title>

      {!simplified && (
        <div className="subscription-container">
          <Title level={3}>Subscribe to be Updated</Title>
          <Title level={4} onClick={handleReadMoreClick} style={{color:'brown'}}>Read more</Title>
        </div>
      )}

      {showSubscriptionForm && (
        <Form onFinish={handleSubmit}>
          
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter first name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name"  required rules={[{  message: 'Please enter last name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter correct email address' }]}>
            <Input />
          </Form.Item>
<br/><br/>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Subsecription ;
