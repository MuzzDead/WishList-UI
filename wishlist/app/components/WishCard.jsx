import React, { useState, useEffect } from "react";
import { Box, Image, Heading, Text, Button, VStack } from "@chakra-ui/react";
import axios from "axios";

const WishCard = ({
  id,
  imageUrl,
  title,
  description,
  createdAt,
  selectedByUserId,
  createdByUserId,
  currentUserId,
  isSelected,
  onSelect,
}) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  useEffect(() => {
    setIsCardSelected(isSelected);
  }, [isSelected]);

  const truncatedDescription =
    description.length > 180 ? description.slice(0, 177) + "..." : description;

  const handleSelect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7168/api/Wish/select/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsCardSelected(true);
      }
    } catch (error) {
      console.error("Error selecting wish:", error);
    }
  };

  const handleDeselect = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7168/api/Wish/deselect/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsCardSelected(false);
      }
    } catch (error) {
      console.error("Error deselecting wish:", error);
    }
  };

  const isSelectedByCurrentUser = selectedByUserId === currentUserId;
  const isDisabled = isCardSelected && !isSelectedByCurrentUser;

  const handleButtonClick = () => {
    if (isCardSelected && isSelectedByCurrentUser) {
      handleDeselect();
      window.location.reload();
    } else if (!isCardSelected) {
      handleSelect();
    }
  };

  return (
    <Box
      w="250px"
      h="350px"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      transition="all 0.3s"
      display="flex"
      flexDirection="column"
    >
      <Box p="3" bg="gray.50" flexShrink={0}>
        <Image
          src={imageUrl || "https://i.imgflip.com/2siu6l.jpg?a480408"}
          alt="Wish Image"
          objectFit="cover"
          height="120px"
          width="100%"
          borderRadius="lg"
        />
      </Box>
      <VStack p="4" align="start" spacing="2" flex={1} justifyContent="space-between">
        <Box>
          <Heading as="h4" size="sm" noOfLines={1}>
            {title}
          </Heading>
          <Text fontSize="xs" mt={2}>
            {truncatedDescription}
          </Text>
        </Box>
        <Box w="100%">
          <Text fontSize="2xs" color="gray.500" mb={2}>
            Created: {createdAt}
          </Text>
          {createdByUserId === currentUserId ? (
            <Box display="flex" justifyContent="space-between">
              <Button size="sm" variant="outline" colorScheme="blue">
                Edit
              </Button>
              <Button size="sm" variant="outline" colorScheme="red">
                Delete
              </Button>
            </Box>
          ) : (
            <Button
              size="sm"
              variant="solid"
              colorScheme={isCardSelected ? "red" : "teal"}
              w="full"
              onClick={handleButtonClick}
              isDisabled={isDisabled}
            >
              {isCardSelected
                ? isSelectedByCurrentUser
                  ? "Deselect"
                  : "Selected"
                : "Select"}
            </Button>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default WishCard;
