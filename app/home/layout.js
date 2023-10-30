"use client";

import React from 'react';
import { Box } from '@chakra-ui/react';
import { NavBar } from '../components';

const Layout = ({ children }) => {

  return (
    <Box height="100vh">
      {children}
      <NavBar />
    </Box>
  )
}

export default Layout;
