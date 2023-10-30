"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SearchProduct } from "@/app/components";

const ProductList = [
  {
    id: 1,
    idTipo: 1,
    producto: {
      nombre: "Coca cola 350ml.",
      precio: 12.0,
      stock: 2,
      clasificacion: { idClasificacion: 1, nombre: "Bebida", color: "blue" }
    },
    servicio: {}
  },
  {
    id: 2,
    idTipo: 1,
    producto: {
      nombre: "Barrita de fresa",
      precio: 15.0,
      stock: 14,
      clasificacion: { idClasificacion: 2, nombre: "Panadería", color: "orange" }
    },
    servicio: {}
  },
  {
    id: 3,
    idTipo: 1,
    producto: {
      nombre: "Bolsa de manzana",
      precio: 50.0,
      stock: 12,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" }
    },
    servicio: {}
  },
  {
    id: 4,
    idTipo: 1,
    producto: {
      nombre: "Bolsa de Damasco",
      precio: 24.5,
      stock: 8,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" }
    },
    servicio: {}
  },
  {
    id: 5,
    idTipo: 1,
    producto: {
      nombre: "Bolsa de Kiwi",
      precio: 18.5,
      stock: 6,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" }
    },
    servicio: {}
  },
  {
    id: 6,
    idTipo: 1,
    producto: {
      nombre: "Media crema",
      precio: 12.5,
      stock: 30,
      clasificacion: { idClasificacion: 4, nombre: "Lacteos", color: "purple" }
    },
    servicio: {}
  },
  {
    id: 7,
    idTipo: 1,
    producto: {
      nombre: "Bolsa de mandarina",
      precio: 45.0,
      stock: 24,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" }
    },
    servicio: {}
  },
  {
    id: 8,
    idTipo: 1,
    producto: {
      nombre: "Bolsa de aguacate",
      precio: 40.0,
      stock: 26,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" }
    },
    servicio: {}
  }
];

const Product = () => {
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const productSelected = product => {
    console.log("product ", product);
  };

  useEffect(() => {
    setListProduct(ProductList);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Container maxW="container.xl" color={color}>
      <Box display="flex" justifyContent="space-between">
        <Heading pl={2} size="sm">
          Productos
        </Heading>
        <Button size="sm" leftIcon={<AddIcon />} colorScheme="orange">
          Agregar producto
        </Button>
      </Box>
      <SearchProduct
        ProductList={listProduct}
        loadingData={loading}
        AddProductToBuy={productSelected}
      />
    </Container>
  );
};

export default Product;
