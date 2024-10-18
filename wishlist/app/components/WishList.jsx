import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import WishCard from './WishCard';

const WishList = ({ wishes = [] }) => {  // Provide a default empty array
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = wishes.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(wishes.length / cardsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Reset to first page when wishes change
    setCurrentPage(1);
  }, [wishes]);

  return (
    <Box width="100%" maxWidth="1200px" margin="0 auto" p={4}>
      <Box 
        display="grid" 
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap="15px"
        mx="-5px"
        my="40px"
      >
        {currentCards.map((wish, index) => (
          <Box key={index} px="5px">
            <WishCard {...wish} />
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