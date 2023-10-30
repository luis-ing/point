"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import HailIcon from "@mui/icons-material/Hail";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import selectionTab from "./selecctionTab";

const Layout = ({ children }) => {
  const color = useColorModeValue("gray.600", "gray.300");
  const router = useRouter();
  const pathName = usePathname();
  const [activeButton] = useState(selectionTab(pathName));

  return (
    <div>
      <Tabs
        isFitted
        variant="enclosed"
        colorScheme="orange"
        color={color}
        defaultIndex={activeButton}
      >
        <TabList mb="1em">
          <Tab
            onClick={() => {
              router.push("/home/admin/product");
            }}
          >
            <Icon as={ListAltIcon} mr={2} />
          </Tab>
          <Tab
            onClick={() => {
              router.push("/home/admin/service");
            }}
          >
            <Icon as={HailIcon} mr={2} />
          </Tab>
          <Tab
            onClick={() => {
              router.push("/home/admin/inventory");
            }}
          >
            <Icon as={InventoryIcon} mr={2} />
          </Tab>
          <Tab>
            <Icon as={CategoryIcon} mr={2} />
          </Tab>
          <Tab>
            <Icon as={LocalShippingIcon} mr={2} />
          </Tab>
        </TabList>
      </Tabs>
      <Box paddingLeft={4} paddingRight={4} paddingTop={2}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
