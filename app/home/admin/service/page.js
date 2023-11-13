"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SearchProduct, ModalService } from "@/app/components";

const ProductList = [
  { id: 9, idTipo: 2, producto: {}, servicio: { idServicio: 1, nombre: "Servicio de manicure", precio: 155.00, descripcion: "Tratamiento de uñas de las manos" } },
  { id: 10, idTipo: 2, producto: {}, servicio: { idServicio: 2, nombre: "Servicio de pedicure", precio: 160.00, descripcion: "Tratamiento de uñas de los pies" } },
  { id: 11, idTipo: 2, producto: {}, servicio: { idServicio: 3, nombre: "Servicio masaje", precio: 45.00, descripcion: "" } },
];

const Service = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataForm, setDataForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();

  const handlerModalOpen = () => {
    setDataForm({
      nombre: '',
      descripcion: '',
      precio: '',
    });
    onOpen();
  }

  const productSelected = service => {
    console.log('service ', service);
    setDataForm({
      nombre: service.servicio.nombre,
      descripcion: service.servicio.descripcion,
      precio: service.servicio.precio,
    });
    onOpen();
  };

  const saveProductData = (e) => {
    e.preventDefault();
    setLoadingButton(true);
    setTimeout(() => {
      console.log('dataForm ', dataForm);
      toast({
        title: "Datos guadados exitosamente",
        position: "bottom-right",
        status: "success",
        isClosable: true
      });
      onClose();
      setLoadingButton(false);
    }, 2000);
  }

  useEffect(() => {
    setListProduct(ProductList);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <Container maxW="container.xl" color={color}>
      <ModalService
        isOpen={isOpen}
        onClose={onClose}
        saveProductData={saveProductData}
        dataForm={dataForm}
        setDataForm={setDataForm}
        loadingButton={loadingButton}
      />
      <Box display="flex" justifyContent="space-between">
        <Heading pl={2} size="sm">
          Servicio
        </Heading>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="orange"
          onClick={handlerModalOpen}
        >
          Agregar servicio
        </Button>
      </Box>
      <SearchProduct
        ProductList={listProduct}
        loadingData={loading}
        AddProductToBuy={productSelected}
        title="servicios"
      />
    </Container>
  )
}

export default Service