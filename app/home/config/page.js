'use client';
import React from "react";
import Link from 'next/link';
import { useColorMode, Button } from "@chakra-ui/react";

const ConfigComponente = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
        <div>Config</div>
        <Button colorScheme='orange' onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <br />
        <Button colorScheme='orange'>
          <Link href="/home/logout">Logout</Link>
        </Button>
        
    </>
    );
};

export default ConfigComponente;
