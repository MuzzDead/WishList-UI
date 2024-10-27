"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import OurUserPage from "../components/OurUserPage";

const ProfilePage = () => {
  const [username, setUsername] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [selectedWishes, setSelectedWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");

      if (token && storedUsername && userId) {
        setUsername(storedUsername);
        setCurrentUserId(userId);

        try {
          const userWishesResponse = await axios.get(
            `https://localhost:7168/api/Wish/user-wishes/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Додаємо userId як createdByUserId для кожного бажання користувача
          const userWishes = userWishesResponse.data.map(wish => ({
            ...wish,
            createdByUserId: userId,
          }));
          setWishes(userWishes);

          const selectedWishesResponse = await axios.get(
            `https://localhost:7168/api/Wish/selected-wishes/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSelectedWishes(selectedWishesResponse.data);
          setLoading(false);
        } catch (err) {
          setError("Error loading profile data.");
        }
      } else {
        setError("User not logged in.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <OurUserPage
      username={username}
      selectedWishes={selectedWishes}
      wishes={wishes}
      currentUserId={currentUserId}
    />
  );
};

export default ProfilePage;
