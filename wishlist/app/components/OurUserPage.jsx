// app/components/OurUserPage.jsx
import React from 'react';
import { Box, VStack, Heading, Container, Divider, Button, Flex, Text } from '@chakra-ui/react';
import WishList from './WishList';
import Link from 'next/link';

const OurUserPage = ({ username, selectedWishes = [], wishes = [] }) => {
  return (
    <Box minHeight="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading as="h1" size="2xl" textAlign="center">
            {username}
          </Heading>
          
          <Flex justifyContent="center" width="100%">
            <Link href="/create-wish" passHref legacyBehavior>
              <Button 
                as="a"
                colorScheme="teal" 
                variant="solid"
                size="lg"
              >
                Create Wish
              </Button>
            </Link>
          </Flex>

          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />
          
          <Heading as="h2" size="xl" textAlign="center">
            Selected Wishes
          </Heading>
          
          {selectedWishes.length > 0 ? (
            <WishList wishes={selectedWishes} />
          ) : (
            <Text>No wishes selected yet.</Text>
          )}
          
          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />
          
          <Heading as="h2" size="xl" textAlign="center">
            Your Wishes:
          </Heading>
          
          {wishes.length > 0 ? (
            <WishList wishes={wishes} />
          ) : (
            <Text>No wishes created yet.</Text>
          )}
          
          <Divider borderColor="gray.300" borderWidth="2px" width="80%" />
        </VStack>
      </Container>
    </Box>
  );
};

export default OurUserPage;