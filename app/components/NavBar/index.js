import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabList, Tab, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import selectionButton from "./selectionButton";

const NavBar = () => {
  const color = useColorModeValue('gray.600', 'gray.300');
  const router = useRouter();
  const pathName = usePathname();
  const [activeButton] = useState(selectionButton(pathName));

  return (
    <Tabs
      isFitted
      isLazy
      width="100%"
      position="fixed"
      bottom="0"
      left="0"
      zIndex="1"
      colorScheme="orange"
      color={color}
      defaultIndex={activeButton}
      backdropFilter="blur(10px);"
    >
      <TabList>
        <Tab
          onClick={() => {
            router.push("/home");
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Icon as={LocalMallRoundedIcon} />
            <Text fontSize="xs">Ventas</Text>
          </Box>
        </Tab>
        <Tab
          onClick={() => {
            router.push("/home/admin/product");
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Icon as={InventoryIcon} />
            <Text fontSize="xs">Productos</Text>
          </Box>
        </Tab>
        <Tab
          onClick={() => {
            router.push("/home/config");
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Icon as={SettingsRoundedIcon} />
            <Text fontSize="xs">Configuración</Text>
          </Box>
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default NavBar;
