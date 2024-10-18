// app/components/Header.jsx
import { Box, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import Link from 'next/link';

const Header = () => {
  return (
    <Box as="header" bg="#C56A67" py={4} px={8} shadow="sm">
      <Flex align="center">
        <Link href="/" passHref legacyBehavior>
          <Heading as="a" size="lg" color="white" cursor="pointer">
            WishList
          </Heading>
        </Link>
        <Spacer />
        <Link href="/login" passHref legacyBehavior>
          <Button 
            as="a"
            bg="white" 
            color="teal" 
            borderColor="teal" 
            borderWidth="2px" 
            variant="outline" 
            mr={4}
            w="100px"
          >
            Login
          </Button>
        </Link>
        <Link href="/register" passHref legacyBehavior>
          <Button 
            as="a"
            colorScheme="teal" 
            variant="solid"
            w="100px"
          >
            Register
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Header;