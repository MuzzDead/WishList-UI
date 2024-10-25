// app/components/WishList.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Stack,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import WishCard from "./WishCard"; // Не забудьте імпортувати WishCard

const WishList = ({ username, userId }) => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7168/api/Wish/user-wishes/${userId}`
        );
        setWishes(response.data);
      } catch (err) {
        console.error("Error fetching wishes:", err.response);
        setError(err.response?.data?.message || "Failed to fetch wishes");
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [userId]); // Залежність від userId

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  // Логіка пагінації
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = wishes.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(wishes.length / cardsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box width="100%" maxWidth="1200px" margin="0 auto" p={4}>
      <Heading as="h1" size="2xl" textAlign="center">
        {username}
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="15px"
        mx="-5px"
        my="40px"
      >
        {currentCards.map((wish, index) => (
          <Box key={wish.id} px="5px">
            {" "}
            {/* Використовуйте унікальний id для ключа */}
            <WishCard
              id={wish.id}
              imageUrl={wish.imageUrl}
              title={wish.title}
              description={wish.description}
              createdAt={wish.createdAt}
              isSelected={wish.isSelected} // Передайте інформацію про вибір
              selectedByUser
              Id={wish.selectedByUserId} // Виправлено на selectedByUser Id
            />
          </Box>
        ))}
      </Box>
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        <Text mx={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default WishList;
