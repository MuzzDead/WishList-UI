import React from 'react';
import UserPage from '@/app/components/UserPage';

const UserProfile = ({ params }) => {
  const { username, userId } = params;

  return <UserPage username={username} userId={userId} />;
};

export default UserProfile;