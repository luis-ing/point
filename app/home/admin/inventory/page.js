"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { InventoryInformationGeneral, ProductTable, ModalInventoryAdd } from "@/app/components";

const ProductList = [
  {
    id: 1,
    idTipo: 1,
    producto: {
      idProducto: 1,
      nombre: "Coca cola 350ml.",
      descripcion: "Bebida carbonatada",
      precio: 12.0,
      precioCompra: 8.00,
      stock: 2,
      stockMin: 4,
      stockMax: 10,
      clasificacion: { idClasificacion: 1, nombre: "Bebida", color: "blue" },
      proveedor: { idProveedor: 1, nombre: "Coca Cola" }
    },
    servicio: {}
  },
  {
    id: 2,
    idTipo: 1,
    producto: {
      idProducto: 2,
      nombre: "Barrita de fresa",
      descripcion: "",
      precio: 15.0,
      precioCompra: 10.00,
      stock: 14,
      stockMin: 10,
      stockMax: 25,
      clasificacion: { idClasificacion: 2, nombre: "Panadería", color: "orange" },
      proveedor: { idProveedor: 3, nombre: "Marinela" }
    },
    servicio: {}
  },
  {
    id: 3,
    idTipo: 1,
    producto: {
      idProducto: 3,
      nombre: "Bolsa de manzana",
      descripcion: "",
      precio: 50.0,
      precioCompra: 30.00,
      stock: 12,
      stockMin: 12,
      stockMax: 16,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" },
      proveedor: { idProveedor: 2, nombre: "Frutería El Fulano" }
    },
    servicio: {}
  },
  {
    id: 4,
    idTipo: 1,
    producto: {
      idProducto: 4,
      nombre: "Bolsa de Damasco",
      descripcion: "",
      precio: 24.5,
      precioCompra: 18.00,
      stock: 8,
      stockMin: 2,
      stockMax: 6,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" },
      proveedor: { idProveedor: 2, nombre: "Frutería El Fulano" }
    },
    servicio: {}
  },
  {
    id: 5,
    idTipo: 1,
    producto: {
      idProducto: 5,
      nombre: "Bolsa de Kiwi",
      descripcion: "",
      precio: 18.5,
      precioCompra: 14.00,
      stock: 6,
      stockMin: 5,
      stockMax: 10,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" },
      proveedor: { idProveedor: 2, nombre: "Frutería El Fulano" }
    },
    servicio: {}
  },
  {
    id: 6,
    idTipo: 1,
    producto: {
      idProducto: 6,
      nombre: "Media crema",
      descripcion: "Producto lacteo",
      precio: 12.5,
      precioCompra: 6.00,
      stock: 30,
      stockMin: 4,
      stockMax: 10,
      clasificacion: { idClasificacion: 4, nombre: "Lacteos", color: "purple" },
      proveedor: { idProveedor: 4, nombre: "Lala" }
    },
    servicio: {}
  },
  {
    id: 7,
    idTipo: 1,
    producto: {
      idProducto: 7,
      nombre: "Bolsa de mandarina",
      descripcion: "",
      precio: 45.0,
      precioCompra: 30.00,
      stock: 24,
      stockMin: 14,
      stockMax: 20,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" },
      proveedor: { idProveedor: 2, nombre: "Frutería El Fulano" }
    },
    servicio: {}
  },
  {
    id: 8,
    idTipo: 1,
    producto: {
      idProducto: 8,
      nombre: "Bolsa de aguacate",
      descripcion: "",
      precio: 40.0,
      precioCompra: 25.00,
      stock: 26,
      stockMin: 15,
      stockMax: 30,
      clasificacion: { idClasificacion: 3, nombre: "Frutería", color: "red" },
      proveedor: { idProveedor: 2, nombre: "Frutería El Fulano" }
    },
    servicio: {}
  }
];

const ClassificationList = [
  { idClasificacion: 1, nombre: "Bebida", color: "blue" },
  { idClasificacion: 2, nombre: "Panadería", color: "orange" },
  { idClasificacion: 3, nombre: "Frutería", color: "red" },
  { idClasificacion: 4, nombre: "Lacteos", color: "purple" },
]

const Inventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [dataForm, setDataForm] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();

  const handleModalAddInventory = (product) => {
    setDataForm({
      idProducto: product.producto.idProducto,
      nombre: product.producto.nombre,
      stock: product.producto.stock,
      stockAdd: '',
      precioCompra: product.producto.precioCompra,
      precio: product.producto.precio,
    });

    onOpen();
  }

  const saveProductData = (e) => {
    e.preventDefault();
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      onClose();
      console.log('dataForm ', dataForm);

      toast({
        title: "Los productos se añadieron correctamente.",
        position: "bottom-right",
        status: "success",
        isClosable: true
      });
    }, 1500);
  }

  useEffect(() => {
    setListProduct(ProductList);
    setTimeout(() => {
      setLoadingButton(false);
    }, 800);
  }, []);

  const paddingBottom = useBreakpointValue({
    base: "20%", // Valor predeterminado para resoluciones menores a "md"
    md: "5%" // Valor para resoluciones "md" o mayores
  });

  return (
    <Container maxW="container.xl" color={color} paddingBottom={paddingBottom}>
      <Box display="flex" justifyContent="space-between">
        <Heading pl={2} size="md">
          Inventario
        </Heading>
      </Box>
      <InventoryInformationGeneral
        listProduct={listProduct}
      />
      <ProductTable
        listProduct={listProduct}
        ClassificationList={ClassificationList}
        handleModalAddInventory={handleModalAddInventory}
      />
      <ModalInventoryAdd
        isOpen={isOpen}
        onClose={onClose}
        saveProductData={saveProductData}
        dataForm={dataForm}
        setDataForm={setDataForm}
        loadingButton={loadingButton}
      />
    </Container>
  );
};

export default Inventory;
