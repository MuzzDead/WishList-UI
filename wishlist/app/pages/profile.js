// pages/profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OurUserPage from '../components/OurUserPage'; // Імпортуємо компонент

const ProfilePage = () => {
  const [username, setUsername] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [selectedWishes, setSelectedWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      const userId = localStorage.getItem('userId'); // Припустимо, що ви зберігаєте userId в localStorage

      if (storedToken && storedUsername && userId) {
        setUsername(storedUsername);

        try {
          // Отримуємо бажання користувача
          const userWishesResponse = await axios.get(`http://localhost:7168/api/Wish/user-wishes/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setWishes(userWishesResponse.data);

          // Отримуємо вибрані бажання
          const selectedWishesResponse = await axios.get(`http://localhost:7168/api/Wish/sected-wishes/${userId}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setSelectedWishes(selectedWishesResponse.data);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch wishes");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <OurUser Pageusername={username} wishes={wishes} selectedWishes={selectedWishes} />
  );
};

export default ProfilePage;