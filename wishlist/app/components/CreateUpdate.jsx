"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Container,
  Text,
} from '@chakra-ui/react';

export default function CreateUpdate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const wishId = searchParams.get('id');

  useEffect(() => {
    if (wishId) {
      setIsEditMode(true);
      // Fetch existing wish data
      axios.get(`https://localhost:7168/api/Wish/${wishId}`)
        .then(response => {
          const { title, description, imageUrl } = response.data;
          setTitle(title);
          setDescription(description);
          setImage(imageUrl);
        })
        .catch(error => console.error("Error fetching wish:", error));
    }
  }, [wishId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const wishData = {
      Title: title,
      Description: description,
      ImageUrl: image,
      UserId: localStorage.getItem("userId"),
    };

    try {
      const url = isEditMode 
        ? `https://localhost:7168/api/Wish/${wishId}`
        : 'https://localhost:7168/api/Wish';
      const method = isEditMode ? 'put' : 'post';
      
      await axios[method](url, wishData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      router.push('/profile');
    } catch (error) {
      console.error("Error submitting wish:", error.response?.data?.message || error.message);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setImage('');
    router.push('/profile');
  };

  return (
    <Container maxW="lg" py={12}>
      <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading fontSize={'2xl'}>
            {isEditMode ? 'Edit Wish' : 'Create New Wish'}
          </Heading>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 40))}
              maxLength={40}
            />
            <Text fontSize="sm" color="gray.500" align="right">
              {title.length}/40
            </Text>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 180))}
              resize="none"
              minHeight="100px"
              maxLength={180}
            />
            <Text fontSize="sm" color="gray.500" align="right">
              {description.length}/180
            </Text>
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}
            type="submit"
            width="full"
          >
            {isEditMode ? 'Update Wish' : 'Create Wish'}
          </Button>
          <Button
            bg={'gray.400'}
            color={'white'}
            _hover={{ bg: 'gray.500' }}
            onClick={handleCancel}
            width="full"
          >
            Cancel
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
