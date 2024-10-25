"use client";

import { ChakraProvider, Box, Button, Heading, Center} from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserPage from "./components/UserPage";
import Link from 'next/link';
import SearchUser from "./components/SerchUser";
import OurUserPage from "./components/OurUserPage";

export default function Home() {
  return (
    <Box>
      <Center>

        <Heading as='h2' size='3xl' noOfLines={1} justifyContent="center">
          Welcome on WishList!
        </Heading>
      </Center>
      <br>
      </br>
      <br>
      </br>
        <SearchUser />
    </Box>
  );
}