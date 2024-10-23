// pages/profile.js

"use client"; // Додайте цю директиву на початку файлу

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OurUserPage from '../components/OurUserPage'; // Імпортуємо компонент з правильною назвою

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
        const userId = localStorage.getItem('userId');
      
        if (storedToken && storedUsername && userId) {
          setUsername(storedUsername);
      
          try {
            console.log("Fetching user wishes for userId:", userId); // Логування userId
            const userWishesResponse = await axios.get(`http://localhost:7168/api/Wish/user-wishes/${userId}`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });
            setWishes(userWishesResponse.data);
      
            console.log("Fetching selected wishes for userId:", userId); // Логування userId
            const selectedWishesResponse = await axios.get(`http://localhost:7168/api/Wish/sected-wishes/${userId}`, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });
            setSelectedWishes(selectedWishesResponse.data);
          } catch (err) {
            console.error("Error fetching wishes:", err);
            setError(err.response?.data?.message || "Failed to fetch wishes");
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <OurUserPage username={username} wishes={wishes} selectedWishes={selectedWishes} />
  );
};

export default ProfilePage;