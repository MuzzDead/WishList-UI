import { jwtDecode } from "jwt-decode";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Checkbox,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import axios from "axios"; // Імпортуємо axios

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7168/api/Account/login",
        {
          Username: username,
          Password: password,
        }
      );

      const token = response.data.token;
      const decodedToken = jwtDecode(token); // Використовуємо jwt_decode

      // Зберігаємо токен, username і userId у localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", decodedToken.sub); // Зберігаємо userId з токена

      toast({
        title: "Login successful.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error); // Логування помилки входу

      // Перевірка наявності response.data
      const errorMessage = error.response
        ? error.response.data
        : "An error occurred.";

      toast({
        title: "Login failed.",
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
                isLoading={isLoading}
              >
                Login
              </Button>
              <Button
                bg={"gray.300"}
                color={"gray.600"}
                _hover={{
                  bg: " gray.400",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
