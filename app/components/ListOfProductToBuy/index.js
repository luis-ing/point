"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Icon,
  Heading,
  Center,
  Divider,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  InputRightElement,
  Button
} from "@chakra-ui/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DiscountIcon from '@mui/icons-material/Discount';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CardOfProductToBuy from "../CardOfProductToBuy";

const ListOfProductToBuy = ({
  totalToPay,
  productsToBuy,
  DeleteProductToBuy,
  amountOther,
  setAmountOther,
  amountDiscount,
  setAmountDiscount,
  amountTip,
  setAmountTip,
  onOpen
}) => {
  const color = useColorModeValue('gray.600', 'gray.300');
  const listRef = useRef(null);

  const scrollToBottom = () => {
    listRef.current?.lastChild.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(productsToBuy.length > 0) {
      scrollToBottom();
    }
  }, [productsToBuy]);

  return (
    <Box pt={6} color={color}>
      <Box width="100%">
        <Box display="flex" alignItems="flex-end">
          <Icon as={ShoppingCartIcon} boxSize={5} />
          <Heading pl={2} size="sm">
            Carrito
          </Heading>
        </Box>
      </Box>
      <Box pt={2} pb={2}>
        <Center>
          <Heading as="h3" size="lg">
            {`Total $${totalToPay}`}
          </Heading>
        </Center>
      </Box>
      <Divider />
      <Box
        mt={4}
        minHeight="20vh"
        maxHeight="40vh"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "10px" // Ancho de la barra de desplazamiento
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 0, 0, 0.2)", // Color de la barra de desplazamiento
            borderRadius: "10px" // Borde redondeado de la barra de desplazamiento
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(0, 0, 0, 0.4)" // Cambio de color al pasar el mouse sobre la barra
          }
        }}
        ref={listRef}
      >
        {productsToBuy.length > 0
          ? productsToBuy.map(item => 
            <CardOfProductToBuy key={item.id} item={item} DeleteProductToBuy={DeleteProductToBuy} />)
          : <Box pt={6}>
              <Center>
                <Text fontSize="md" textAlign="center">
                  Agrega productos
                </Text>
              </Center>
              <Center pt={4}>
                <Icon as={AddShoppingCartIcon} w={10} h={10} />
              </Center>
            </Box>}
      </Box>
      <Divider pt={3} />
      <Box mt={2}>
        <Box display="flex" mt={2}>
            <Box display="flex" alignItems="center" w="50%">
              <Icon as={Inventory2Icon} />
              <Text
                pl={2}
                fontSize='md'
              >
                Otros
              </Text>
            </Box>
            <InputGroup w="50%">
              <InputLeftElement
                pointerEvents='none'
                fontSize='1.2em'
                children='$'
              />
              <Input
                type="number"
                placeholder='0.00'
                value={amountOther}
                onChange={(e) => setAmountOther(e.target.value)}
              />
            </InputGroup>
        </Box>
        <Box display="flex" mt={2}>
            <Box display="flex" alignItems="center" w="50%">
              <Icon as={DiscountIcon} />
              <Text pl={2} fontSize='md'>Descuentos</Text>
            </Box>
            <InputGroup w="50%">
            <InputRightElement
                pointerEvents='none'
                fontSize='1.2em'
                children='%'
                pr={10}
              />
              <InputRightElement
                pointerEvents='none'
                fontSize='1.2em'
                children='$'
              />
              <Input
                type="number"
                placeholder='0'
                value={amountDiscount}
                onChange={(e) => setAmountDiscount(e.target.value)}
              />
            </InputGroup>
        </Box>
        <Box display="flex" mt={2}>
            <Box display="flex" alignItems="center" w="50%">
              <Icon as={VolunteerActivismIcon} />
              <Text pl={2} fontSize='md' >Propina</Text>
            </Box>
            <InputGroup w="50%">
              <InputRightElement
                pointerEvents='none'
                fontSize='1.2em'
                children='%'
                pr={10}
              />
              <InputRightElement
                pointerEvents='none'
                fontSize='1.2em'
                children='$'
              />
              <Input
                type="number"
                placeholder='0'
                value={amountTip}
                onChange={(e) => setAmountTip(e.target.value)}
              />
            </InputGroup>
        </Box>
      </Box>
      <Box pt={4}>
        <Button colorScheme='orange' w="100%" onClick={onOpen} isDisabled={totalToPay === 0}>
          {`Aceptar pago: $${totalToPay}`}
        </Button>
      </Box>
    </Box>
  );
};

export default ListOfProductToBuy;
