import { Box, Text, Flex, Spacer, Link, Icon } from "@chakra-ui/react";
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" bg="#C56A67" py={4} px={8} shadow="sm" mt="auto">
      <Flex align="center">
        {/* Текст по центру */}
        <Text color="white" fontSize="sm" textAlign="center">
          © 2024 WishList. All rights reserved.
        </Text>

        <Spacer />

        {/* Іконка GitHub з посиланням на профіль */}
        <Link href="https://github.com/MuzzDead" isExternal>
          <FaGithub color="white" fontSize="32px"/>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;