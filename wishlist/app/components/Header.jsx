import { Box, Button, Flex, Spacer, Heading, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'; // Імпорт іконки
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Отримуємо токен і username з localStorage при завантаженні компонента
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Видаляємо токен і username з localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  return (
    <Box as="header" bg="#C56A67" py={4} px={8} shadow="sm">
      <Flex align="center">
        <Link href="/" passHref legacyBehavior>
          <Heading as="a" size="lg" color="white" cursor="pointer">
            WishList
          </Heading>
        </Link>
        <Spacer />
        {username ? (
          <Menu>
            <MenuButton 
              as={Button} // Використовуємо кнопку для кращої інтерактивності
              variant="link" // Зробимо кнопку без фону
              color="white"
              fontWeight="bold"
              fontSize="lg" // Збільшено розмір шрифту
              _hover={{ textDecoration: 'underline', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} // Додаємо ефект наведенні
              _active={{ bg: 'transparent' }} // Зберігаємо фон прозорим при активації
              rightIcon={<ChevronDownIcon color="white" boxSize={6} />} // Збільшено розмір іконки
            >
              {username}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/profile" passHref legacyBehavior>
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
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
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;