import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Container,
  Divider,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import WishCard from "./WishCard";
import Link from "next/link";
import axios from "axios";

const OurUserPage = ({
  username,
  selectedWishes = [],
  wishes = [],
  currentUserId,
}) => {
  const [userSelectedWishes, setUserSelectedWishes] = useState(selectedWishes);

  // Стани пагінації для обраних і створених бажань
  const [currentSelectedPage, setCurrentSelectedPage] = useState(1);
  const [currentCreatedPage, setCurrentCreatedPage] = useState(1);
  const wishesPerPage = 8;

  const handleSelectWish = async (wishId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://localhost:7168/api/Wish/select/${wishId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserSelectedWishes((prev) => [
        ...prev,
        { ...wishes.find((w) => w.id === wishId), isSelected: true },
      ]);
    } catch (error) {
      console.error("Error selecting wish:", error);
    }
  };

  const handleDeselectWish = async (wishId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://localhost:7168/api/Wish/deselect/${wishId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserSelectedWishes((prev) => prev.filter((wish) => wish.id !== wishId));
    } catch (error) {
      console.error("Error deselecting wish:", error);
    }
  };

  // Розрахунок для пагінації обраних бажань
  const indexOfLastSelected = currentSelectedPage * wishesPerPage;
  const indexOfFirstSelected = indexOfLastSelected - wishesPerPage;
  const currentSelectedWishes = userSelectedWishes.slice(indexOfFirstSelected, indexOfLastSelected);
  const totalSelectedPages = Math.ceil(userSelectedWishes.length / wishesPerPage);

  // Розрахунок для пагінації створених бажань
  const indexOfLastCreated = currentCreatedPage * wishesPerPage;
  const indexOfFirstCreated = indexOfLastCreated - wishesPerPage;
  const currentCreatedWishes = wishes.slice(indexOfFirstCreated, indexOfLastCreated);
  const totalCreatedPages = Math.ceil(wishes.length / wishesPerPage);

  const handleSelectedPageChange = (newPage) => {
    setCurrentSelectedPage(newPage);
  };

  const handleCreatedPageChange = (newPage) => {
    setCurrentCreatedPage(newPage);
  };

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading as="h1" size="2xl" textAlign="center">
            {username}
          </Heading>

          <Flex justifyContent="center" width="100%">
            <Link href="/create-wish" passHref legacyBehavior>
              <Button as="a" colorScheme="teal" variant="solid" size="lg">
                Create Wish
              </Button>
            </Link>
          </Flex>

          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />

          {/* Обрані бажання з пагінацією */}
          <Heading as="h2" size="xl" textAlign="center">
            Selected Wishes
          </Heading>

          {currentSelectedWishes.length > 0 ? (
            <Flex wrap="wrap" justifyContent="center" gap={4}>
              {currentSelectedWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  {...wish}
                  currentUserId={currentUserId}
                  onSelect={handleSelectWish}
                  onDeselect={handleDeselectWish}
                />
              ))}
            </Flex>
          ) : (
            <Text>No wishes selected yet.</Text>
          )}

          {/* Пагінація обраних бажань */}
          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Button
              onClick={() => handleSelectedPageChange(currentSelectedPage - 1)}
              isDisabled={currentSelectedPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <Text mx={2}>
              Page {currentSelectedPage} of {totalSelectedPages}
            </Text>
            <Button
              onClick={() => handleSelectedPageChange(currentSelectedPage + 1)}
              isDisabled={currentSelectedPage === totalSelectedPages}
              ml={2}
            >
              Next
            </Button>
          </Flex>

          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />

          {/* Створені бажання з пагінацією */}
          <Heading as="h2" size="xl" textAlign="center">
            Your Wishes:
          </Heading>

          {currentCreatedWishes.length > 0 ? (
            <Flex wrap="wrap" justifyContent="center" gap={4}>
              {currentCreatedWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  {...wish}
                  currentUserId={currentUserId}
                  onSelect={handleSelectWish}
                  onDeselect={handleDeselectWish}
                />
              ))}
            </Flex>
          ) : (
            <Text>No wishes created yet.</Text>
          )}

          {/* Пагінація створених бажань */}
          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Button
              onClick={() => handleCreatedPageChange(currentCreatedPage - 1)}
              isDisabled={currentCreatedPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <Text mx={2}>
              Page {currentCreatedPage} of {totalCreatedPages}
            </Text>
            <Button
              onClick={() => handleCreatedPageChange(currentCreatedPage + 1)}
              isDisabled={currentCreatedPage === totalCreatedPages}
              ml={2}
            >
              Next
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurUserPage;
