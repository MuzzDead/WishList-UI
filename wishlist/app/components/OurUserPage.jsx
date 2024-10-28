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

const OurUserPage = ({ username, selectedWishes = [], wishes = [], currentUserId }) => {
  const [userSelectedWishes, setUserSelectedWishes] = useState(selectedWishes);
  const [currentSelectedPage, setCurrentSelectedPage] = useState(1);
  const [currentCreatedPage, setCurrentCreatedPage] = useState(1);
  const wishesPerPage = 8;

  // Calculate total pages for each section
  const totalSelectedPages = Math.ceil(userSelectedWishes.length / wishesPerPage);
  const totalCreatedPages = Math.ceil(wishes.length / wishesPerPage);

  const handleSelectWish = async (wishId) => {
    // Обробник вибору побажання
  };

  const handleDeselectWish = async (wishId) => {
    // Обробник скасування вибору побажання
  };

  const currentSelectedWishes = userSelectedWishes.slice(
    (currentSelectedPage - 1) * wishesPerPage,
    currentSelectedPage * wishesPerPage
  );
  const currentCreatedWishes = wishes.slice(
    (currentCreatedPage - 1) * wishesPerPage,
    currentCreatedPage * wishesPerPage
  );

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

          <Heading as="h2" size="xl" textAlign="center">
            Selected Wishes
          </Heading>

          <Flex wrap="wrap" justifyContent="center" gap={4}>
            {currentSelectedWishes.length > 0 ? (
              currentSelectedWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  {...wish}
                  selectedByUserId={wish.selectedByUserId}
                  createdByUserId={wish.createdByUserId}
                  currentUserId={currentUserId}
                  isSelected={true}
                  onSelect={handleSelectWish}
                  onDeselect={handleDeselectWish}
                />
              ))
            ) : (
              <Text>No selected wishes yet.</Text>
            )}
          </Flex>

          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Button
              onClick={() => setCurrentSelectedPage(currentSelectedPage - 1)}
              isDisabled={currentSelectedPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <Text mx={2}>
              Page {currentSelectedPage} of {totalSelectedPages}
            </Text>
            <Button
              onClick={() => setCurrentSelectedPage(currentSelectedPage + 1)}
              isDisabled={currentSelectedPage === totalSelectedPages}
              ml={2}
            >
              Next
            </Button>
          </Flex>

          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />

          <Heading as="h2" size="xl" textAlign="center">
            Your Wishes:
          </Heading>

          <Flex wrap="wrap" justifyContent="center" gap={4}>
            {currentCreatedWishes.length > 0 ? (
              currentCreatedWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  {...wish}
                  selectedByUserId={wish.selectedByUserId}
                  createdByUserId={wish.createdByUserId}
                  currentUserId={currentUserId}
                  isSelected={false}
                  onSelect={handleSelectWish}
                  onDeselect={handleDeselectWish}
                />
              ))
            ) : (
              <Text>No wishes created yet.</Text>
            )}
          </Flex>

          <Flex justifyContent="center" alignItems="center" mt={4}>
            <Button
              onClick={() => setCurrentCreatedPage(currentCreatedPage - 1)}
              isDisabled={currentCreatedPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <Text mx={2}>
              Page {currentCreatedPage} of {totalCreatedPages}
            </Text>
            <Button
              onClick={() => setCurrentCreatedPage(currentCreatedPage + 1)}
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
