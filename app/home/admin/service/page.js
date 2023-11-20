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
import { SearchProduct, ModalService, ModalWarning } from "@/app/components";

const ProductList = [
  { id: 9, idTipo: 2, producto: {}, servicio: { idServicio: 1, nombre: "Servicio de manicure", precio: 155.00, descripcion: "Tratamiento de uñas de las manos", precioGastoInsumo: 40.00 } },
  { id: 10, idTipo: 2, producto: {}, servicio: { idServicio: 2, nombre: "Servicio de pedicure", precio: 160.00, descripcion: "Tratamiento de uñas de los pies", precioGastoInsumo: 60.00 } },
  { id: 11, idTipo: 2, producto: {}, servicio: { idServicio: 3, nombre: "Servicio masaje", precio: 45.00, descripcion: "", precioGastoInsumo: 5.00 } },
];

const Service = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceToDelete, setServiceToDelete] = useState({});
  const [dataForm, setDataForm] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();

  const handlerModalOpen = () => {
    setDataForm({
      idServicio: null,
      nombre: '',
      descripcion: '',
      precio: '',
      precioGastoInsumo: '',
    });

    onOpen();
  }

  const productSelected = service => {
    setDataForm({
      idServicio: service.servicio.idServicio,
      nombre: service.servicio.nombre,
      descripcion: service.servicio.descripcion,
      precio: service.servicio.precio,
      precioGastoInsumo: service.servicio.precioGastoInsumo
    });
    onOpen();
  };

  const serviceSelectedDelete = product => {
    setServiceToDelete(product);
    onOpenDelete();
  }

  const DeleteService = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      onCloseDelete();
      console.log('Eliminar ', serviceToDelete);

      toast({
        title: "Datos eliminados correctamente",
        position: "bottom-right",
        status: "success",
        isClosable: true
      });
    }, 1000);
  }

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
    }, 600);
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
      <ModalWarning
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        DeleteProduct={DeleteService}
        loadingButton={loadingButton}
        text="¿Confirmas que quieres eliminar este servicio?"
      />
      <Box display="flex" justifyContent="space-between">
        <Heading pl={2} size="md">
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
        Edit={true}
        DeleteProduct={serviceSelectedDelete}
      />
    </Container>
  )
}

export default Service