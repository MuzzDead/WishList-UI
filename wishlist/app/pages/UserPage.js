import React from 'react';
import { Box, VStack, Heading, Container } from '@chakra-ui/react';
import WishList from './WishList'; // Assuming WishList component is in the same directory

const UserPage = ({ username }) => {
  return (
    <Box minHeight="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center">
            {username}'s Wishes
          </Heading>
          <WishList />
        </VStack>
      </Container>
    </Box>
  );
};

export default UserPage;