import React from 'react';
import { Box, Image, Heading, Text, Button, VStack } from "@chakra-ui/react";

const WishCard = ({ image, title, description, createdAt }) => {
  // Truncate description to 180 characters
  const truncatedDescription = description.length > 180 
    ? description.slice(0, 177) + '...' 
    : description;

  return (
    <Box 
      w="250px"
      h="350px"
      borderWidth="1px" 
      borderRadius="xl" 
      overflow="hidden" 
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      display="flex"
      flexDirection="column"
    >
      <Box p="3" bg="gray.50" flexShrink={0}>
        <Image 
          src={image} 
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
          <Button size="sm" variant="solid" colorScheme="teal" w="full">
            Select
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default WishCard;