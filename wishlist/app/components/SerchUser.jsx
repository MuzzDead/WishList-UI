"use client";

import React, { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  List,
  ListItem,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userOptions, setUserOptions] = useState([]);

  // Mock function to simulate API call
  const fetchUsers = (term) => {
    const mockUsers = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Bob Williams',
      'Charlie Brown',
    ].filter(user => user.toLowerCase().includes(term.toLowerCase()));
    
    setUserOptions(mockUsers);
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      fetchUsers(term);
    } else {
      setUserOptions([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.length > 0) {
      fetchUsers(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setUserOptions([]);
  };

  return (
    <Flex justify="center" align="flex-start" minHeight="100vh" pt={8}>
      <Box width="400px">
        <VStack spacing={4}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Search for a user"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              {searchTerm && (
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  onClick={handleClear}
                  mr={1}
                  aria-label="Clear search"
                />
              )}
              <IconButton
                icon={<SearchIcon />}
                size="sm"
                onClick={handleSearch}
                colorScheme="teal"
                aria-label="Search"
              />
            </InputRightElement>
          </InputGroup>
          {userOptions.length > 0 && (
            <List spacing={2} width="100%" bg="white" borderRadius="md" boxShadow="md" p={2}>
              {userOptions.map((user, index) => (
                <ListItem 
                  key={index} 
                  p={2} 
                  _hover={{ bg: 'gray.100' }} 
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                >
                  <Box 
                    width="32px" 
                    height="32px" 
                    borderRadius="full" 
                    bg="gray.300" 
                    mr={2} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Image 
                      src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" 
                      alt="User avatar" 
                      width="100%" 
                      height="100%" 
                      objectFit="cover"
                    />
                  </Box>
                  <Text>{user}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default SearchUser;