// app/layout.js
"use client";

import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ChakraProvider>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Header />
            <Box flex="1" padding="4">
              {children}
            </Box>
            <Footer />
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}