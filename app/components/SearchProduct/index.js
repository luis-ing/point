"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SearchIcon from "@mui/icons-material/Search";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ListProductCard from "../ListProductCard";
import ListProductCartSkeleton from "../ListProductCartSkeleton";

const SearchProduct = ({ ProductList, loadingData, AddProductToBuy, title = 'productos' }) => {
  const color = useColorModeValue("gray.600", "gray.300");
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(
    () => {
      const filtered = ProductList.filter(suggestion =>
        suggestion.idTipo === 1
          ? suggestion.producto.nombre.toLowerCase().includes(inputValue.toLowerCase())
          : suggestion.servicio.nombre.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    },
    [inputValue, ProductList]
  );

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Box pt={4} color={color}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} />
          </InputLeftElement>
          <Input
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            autoComplete="off"
          />
        </InputGroup>
      </Box>
      <Box
        mt={4}
        minHeight="20vh"
        maxHeight="65vh"
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
      >
        {!loadingData
          ? filteredSuggestions.length > 0
            ? filteredSuggestions.map((item, index) =>
              <ListProductCard
                key={index}
                dataProduct={item}
                AddProductToBuy={AddProductToBuy}
              />
            )
            : <Box pt={16}>
              <Center>
                <Text fontSize="md" textAlign="center">
                  {`No se encontraron ${title}, ¡Empieza agregándolos!`}
                </Text>
              </Center>
              <Center pt={4}>
                <Icon as={SentimentVerySatisfiedIcon} w={12} h={12} />
              </Center>
            </Box>
          : <Box>
            <ListProductCartSkeleton />
          </Box>}
      </Box>
    </div>
  );
};

export default SearchProduct;
