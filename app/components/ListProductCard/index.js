"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Badge,
  useTheme,
  useColorMode,
  Button,
  IconButton
} from "@chakra-ui/react";
import DeleteIcon from '@mui/icons-material/Delete';

const ListProductCard = ({ dataProduct, AddProductToBuy, Edit, DeleteProduct }) => {
  const color = useColorModeValue("gray.600", "gray.300");
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const customColor = theme.colorsCustom.colorBackgroundOnSelected[colorMode];
  const colorHover = theme.colorsCustom.colorBackgroundOnHover[colorMode];


  return (
    <Card
      borderRadius={8}
      mt={2}
      mb={2}
      ml={1}
      mr={1}
      color={color}
      _hover={{ cursor: "pointer", bgColor: colorHover }}
      _active={{ bgColor: customColor }}
    >
      <CardHeader pt={3} pb={3} width="100%" color={color}>
        <Flex spacing="4">
          <Box
            flex="1"
            display="flex"
            onClick={() => AddProductToBuy(dataProduct)}
          >
            <Avatar
              name="Aguacate Chiapas"
              src="https://www.gob.mx/cms/uploads/article/main_image/33769/SANDIA.jpg"
            />
            <Box flex="1">
              <Heading size="sm" noOfLines={1} pr={2} pl={2}>
                {dataProduct.idTipo === 1
                  ? dataProduct.producto.nombre
                  : dataProduct.servicio.nombre}
              </Heading>
              <Text fontSize="sm" color="gray.500" pr={2} pl={2}>
                {dataProduct.idTipo === 1 && `${dataProduct.producto.stock} en inventario`}
              </Text>
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
              <Text fontSize="sm">
                {`$${dataProduct.idTipo === 1
                  ? dataProduct.producto.precio
                  : dataProduct.servicio.precio}`}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <Badge
                  colorScheme={dataProduct.idTipo === 1 && dataProduct.producto?.clasificacion?.color}
                  borderRadius={6}
                >
                  {dataProduct.idTipo === 1 && dataProduct.producto?.clasificacion?.nombre}
                </Badge>
              </Text>
            </Box>
            {Edit &&
              <Box flex="1" display="flex">
                <IconButton
                  isRound={true}
                  variant="ghost"
                  color={color}
                  colorScheme="orange"
                  aria-label="Done"
                  size="lg"
                  ml={4}
                  icon={<DeleteIcon />}
                  onClick={() => DeleteProduct(dataProduct)}
                />
              </Box>
            }
          </Box>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default ListProductCard;
