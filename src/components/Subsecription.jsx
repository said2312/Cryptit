import React, { useState } from 'react';
import { Form, Input, Button, Typography , Card } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const SubscriptionForm = ({ simplified }) => {
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  const handleReadMoreClick = () => {
    setShowSubscriptionForm(true);
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:5000/subscribe', values);
      alert('You have successfully subscribed to news!');
    } catch (error) {
      console.error(error);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div>
      <Title level={2}>News</Title>

      {!simplified && (
        <Card className="subscription-container" style={{ textAlign: 'center', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Title level={3}>Subscribe to be Updated</Title>
        <Button type="link" onClick={handleReadMoreClick} style={{ color: 'brown' }}>
          Read more
        </Button>
      </Card>
      )}

      {showSubscriptionForm && (
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Subscribe
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SubscriptionForm;
