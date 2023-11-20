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
import { SearchProduct, ModalProduct, ModalWarning } from "@/app/components";

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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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
      usarInventario: true,
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

const SupplierList = [
  { idProveedor: 1, nombre: "Coca Cola" },
  { idProveedor: 2, nombre: "Frutería El Fulano" },
  { idProveedor: 3, nombre: "Marinela" },
  { idProveedor: 4, nombre: "Lala" },
];


const Product = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplierSelected, setSupplierSelected] = useState({});
  const [ClassificationSelected, setClassificationSelected] = useState({});
  const [productToDelete, setProductToDelete] = useState({});
  const [dataForm, setDataForm] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();

  const handlerModalOpen = () => {
    setDataForm({
      idProducto: null,
      nombre: '',
      descripcion: '',
      precio: '',
      clasificacion: {},
      proveedor: {},
      usarInventario: true,
      stock: 0,
      stockMin: 0,
      stockMax: 0,
    });
    setSupplierSelected({});
    setClassificationSelected({});
    onOpen();
  }

  const productSelected = product => {
    setDataForm({
      idProducto: product.producto.idProducto,
      nombre: product.producto.nombre,
      descripcion: product.producto.descripcion,
      precio: product.producto.precio,
      precioCompra: product.producto.precioCompra,
      clasificacion: product.producto.clasificacion,
      proveedor: product.producto.proveedor,
      usarInventario: product.producto.usarInventario,
      stockMin: product.producto.stockMin,
      stockMax: product.producto.stockMax,
    });
    onOpen();
  };

  const productSelectedDelete = product => {
    setProductToDelete(product);
    onOpenDelete();
  }

  useEffect(() => {
    setDataForm((e) => ({ ...e, clasificacion: ClassificationSelected }))
  }, [ClassificationSelected]);

  useEffect(() => {
    setDataForm((e) => ({ ...e, proveedor: supplierSelected }))
  }, [supplierSelected]);

  const DeleteProduct = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      onCloseDelete();
      console.log('Eliminar ', productToDelete);

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
      setLoadingButton(false);
      onClose();
      console.log('dataForm ', dataForm);

      toast({
        title: "Datos guadados exitosamente",
        position: "bottom-right",
        status: "success",
        isClosable: true
      });

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
      <ModalProduct
        isOpen={isOpen}
        onClose={onClose}
        saveProductData={saveProductData}
        SupplierList={SupplierList}
        setSupplierSelected={setSupplierSelected}
        ClassificationList={ClassificationList}
        setClassificationSelected={setClassificationSelected}
        dataForm={dataForm}
        setDataForm={setDataForm}
        loadingButton={loadingButton}
      />
      <ModalWarning
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        DeleteProduct={DeleteProduct}
        loadingButton={loadingButton}
        text="¿Confirmas que quieres eliminar este producto?"
      />
      <Box display="flex" justifyContent="space-between">
        <Heading pl={2} size="md">
          Productos
        </Heading>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="orange"
          onClick={handlerModalOpen}
        >
          Agregar producto
        </Button>
      </Box>
      <SearchProduct
        ProductList={listProduct}
        loadingData={loading}
        AddProductToBuy={productSelected}
        Edit={true}
        DeleteProduct={productSelectedDelete}
      />
    </Container>
  );
};

export default Product;
