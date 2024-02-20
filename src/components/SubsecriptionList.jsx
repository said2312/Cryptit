import React from 'react';
import { useSelector } from 'react-redux';

const SubscriptionList = () => {

  const users = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2>Subscribed Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
