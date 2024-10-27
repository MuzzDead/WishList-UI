"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Додано імпорт axios
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
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const wishData = {
      Title: title,
      Description: description,
      ImageUrl: image,
      UserId: localStorage.getItem("userId") // Отримання UserId з localStorage
    };

    try {
      const response = await axios.post('https://localhost:7168/api/Wish', wishData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Додано заголовок авторизації
        },
      });
      console.log("Wish created successfully:", response.data);
      // Перенаправлення на домашню сторінку або іншу сторінку
      router.push('/profile');
    } catch (error) {
      console.error("Error creating wish:", error.response?.data?.message || error.message);
    }
  };

  const handleCancel = () => {
    // Очистка полів форми
    setTitle('');
    setDescription('');
    setImage('');
    
    // Перенаправлення на домашню сторінку
    router.push('/profile');
    console.log("Cancel clicked, form cleared, and navigating to home page");
  };

  const handleTitleChange = (e) => {
    const value = e.target.value.slice(0, 40); // Обмеження до 40 символів
    setTitle(value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value.slice(0, 180); // Обмеження до 180 символів
    setDescription(value);
  };

  return (
    <Container maxW="lg" py={12}>
      <Box
        rounded={'lg'}
        bg={'white'}
        boxShadow={'lg'}
        p={8}
      >
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading fontSize={'2xl'}>Create New Wish</Heading>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={handleTitleChange}
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
              onChange={handleDescriptionChange}
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
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
            width="full"
          >
            Create Wish
          </Button>
          <Button
            bg={'gray.400'}
            color={'white'}
            _hover={{
              bg: 'gray.500',
            }}
            onClick={handleCancel}
            width="full"
          >
            Cancel
          </Button>
        </VStack >
      </Box>
    </Container>
  );
}