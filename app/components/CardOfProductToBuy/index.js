import React from "react";
import {
  Box,
  Heading,
  Card,
  CardHeader,
  Avatar,
  Flex,
  Text,
  IconButton,
  useColorModeValue
} from "@chakra-ui/react";
import ClearIcon from "@mui/icons-material/Clear";

const CardOfProductToBuy = ({ item, DeleteProductToBuy }) => {
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Card m={1.5} borderRadius={8}>
      <IconButton
        position="absolute"
        right={0}
        mr={1}
        mt={1}
        isRound={true}
        variant="ghost"
        color={color}
        colorScheme="orange"
        aria-label="Done"
        size="xs"
        icon={<ClearIcon />}
        onClick={() => DeleteProductToBuy(item)}
      />
      <CardHeader pt={1} pb={1} width="100%" color={color}>
        <Flex spacing="4">
          <Box flex="1" display="flex">
            <Avatar
              size="sm"
              name="Aguacate Chiapas"
              src="https://www.gob.mx/cms/uploads/article/main_image/33769/SANDIA.jpg"
            />
            <Box flex="1">
              <Heading size="sm" noOfLines={1} pr={2} pl={2}>
                {item.idTipo === 1
                  ? item.producto.nombre
                  : item.servicio.nombre}
              </Heading>
              <Text fontSize="sm" color="gray.500" pr={2} pl={2}>
                {`$${item.idTipo === 1
                  ? item.producto.precio
                  : item.servicio.precio}`}
              </Text>
            </Box>
          </Box>
          <Box
            pr={12}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Text fontSize="sm">
              {`$${(item.idTipo === 1
                ? item.producto.precio
                : item.servicio.precio) * item.quantityToBuy}`}
            </Text>
            <Text fontSize="sm">
              {`${item.quantityToBuy}`}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default CardOfProductToBuy;
