"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Container,
  Box,
  Center,
  Divider,
  useBreakpointValue,
  useToast,
  useDisclosure,
  useColorModeValue,
  Icon,
  Heading,
} from "@chakra-ui/react";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { ListOfProductToBuy, SearchProduct, ModalPayments, ModalWarning } from "../components";

const ProductList = [
  { id: 1, idTipo: 1, producto: { nombre: "Coca cola 350ml.", precio: 12.00, stock: 2 }, servicio: {} },
  { id: 2, idTipo: 1, producto: { nombre: "Barrita de fresa", precio: 15.00, stock: 14 }, servicio: {} },
  { id: 3, idTipo: 1, producto: { nombre: "Bolsa de manzana", precio: 50.00, stock: 12 }, servicio: {} },
  { id: 4, idTipo: 1, producto: { nombre: "Bolsa de Damasco", precio: 24.50, stock: 8 }, servicio: {} },
  { id: 5, idTipo: 1, producto: { nombre: "Bolsa de Kiwi", precio: 18.50, stock: 6 }, servicio: {} },
  { id: 6, idTipo: 1, producto: { nombre: "Media crema", precio: 12.50, stock: 30 }, servicio: {} },
  { id: 7, idTipo: 1, producto: { nombre: "Bolsa de mandarina", precio: 45.00, stock: 24 }, servicio: {} },
  { id: 8, idTipo: 1, producto: { nombre: "Bolsa de aguacate", precio: 40.00, stock: 26 }, servicio: {} },
  { id: 9, idTipo: 2, producto: {}, servicio: { nombre: "Servicio de manicure", precio: 155.00 } },
  { id: 10, idTipo: 2, producto: {}, servicio: { nombre: "Servicio de pedicure", precio: 160.00 } },
  { id: 11, idTipo: 2, producto: {}, servicio: { nombre: "Servicio masaje", precio: 45.00 } },
];

const ClientList = [
  { id: 1, nombre: "fulano" },
  { id: 2, nombre: "Vengano Herrera" },
  { id: 3, nombre: "Juan" },
  { id: 4, nombre: "Pedro" },
  { id: 5, nombre: "Bart" },
];

// const ProductList = [];

const Inicio = () => {
  const color = useColorModeValue("gray.600", "gray.300");
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalToPay, setTotalToPay] = useState(0.00);
  const [amountOther, setAmountOther] = useState("");
  const [amountDiscount, setAmountDiscount] = useState("");
  const [amountTip, setAmountTip] = useState("");
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [methodSelected, setMethodSelected] = useState(1);
  const [clientSelected, setClientSelected] = useState({});
  const [loadingSendPay, setLoadingSendPay] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const toast = useToast();

  const AddProductToBuy = product => {
    const dataProduct = productsToBuy.find(item => item.id === product.id);
    if (dataProduct) {
      const newQuantity = productsToBuy.map(
        (item) => {
          if (item.id === product.id && item.quantityToBuy + 1 > item?.producto?.stock) {
            toast({
              title: "El producto no tiene más stock.",
              position: "bottom-right",
              status: "warning",
              isClosable: true
            });
          }
          return item.id === product.id
            ? {
              ...item, quantityToBuy: (item.quantityToBuy + 1 > item?.producto?.stock
                ? item.producto.stock
                : item.quantityToBuy + 1)
            }
            : item
        }
      );
      setProductsToBuy(newQuantity);
    } else {
      setProductsToBuy(e => [...e, { ...product, quantityToBuy: 1 }]);
    }
  };

  const DeleteProductToBuy = product => {
    const newData = productsToBuy.filter((item) => item.id !== product.id)
    setProductsToBuy(newData);
  };

  const handleModalDeleteCart = () => {
    onOpenDelete();
  }

  const deleteCartToBuy = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      onCloseDelete();

      setProductsToBuy([]);
    }, 2000);
  }

  useEffect(
    () => {
      const subTotalProduct = productsToBuy.reduce((acumulador, element) => {
        return acumulador + (element.idTipo === 1
          ? element.producto.precio : element.servicio.precio) * element.quantityToBuy;
      }, 0);
      const subTotal = (subTotalProduct + Number(amountOther))
      const percentDiscount = (subTotal / 100) * Number(amountDiscount);
      const percentTip = (subTotal / 100) * Number(amountTip);
      const total = (subTotal + percentTip - percentDiscount).toFixed(2);
      setTotalToPay(total);
      localStorage.setItem("shoppingCart", JSON.stringify(productsToBuy));
    },
    [productsToBuy, amountOther, amountDiscount, amountTip]
  );

  useEffect(() => {
    setListProduct(ProductList);
    setProductsToBuy(JSON.parse(localStorage.getItem("shoppingCart")));
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const paddingBottom = useBreakpointValue({
    base: "20%", // Valor predeterminado para resoluciones menores a "md"
    md: "5%" // Valor para resoluciones "md" o mayores
  });

  const handlerPay = (e) => {
    e.preventDefault();
    setLoadingSendPay(true);
    console.log('Formulario: ', e);
    console.log('clientSelected -> ', clientSelected);
    setTimeout(() => {
      setLoadingSendPay(false);
      toast({
        title: "Venta exitosa",
        position: "bottom-right",
        status: "success",
        isClosable: true
      });
      setProductsToBuy([]);
      setAmountOther("");
      setAmountDiscount("");
      setAmountTip("");
      onClose();
    }, 2000);
  }

  return (
    <>
      <Box paddingLeft={3} paddingRight={3} paddingBottom={paddingBottom} color={color}>
        <Grid templateColumns={["100%", "60% 2% 38%"]}>
          <GridItem>
            <Container maxW="container.sm">
              <Box width="100%" display="flex" pt={6}>
                <Box display="flex" alignItems="flex-end">
                  <Icon as={LocalMallRoundedIcon} boxSize={5} />
                  <Heading pl={2} size="md">
                    Ventas
                  </Heading>
                </Box>
              </Box>
              <SearchProduct
                ProductList={listProduct}
                loadingData={loading}
                AddProductToBuy={AddProductToBuy}
              />
            </Container>
          </GridItem>
          <GridItem>
            <Center height="100%" pt={1} pb={1}>
              <Divider orientation="vertical" />
            </Center>
          </GridItem>
          <GridItem>
            <Container maxW="container.sm">
              <ListOfProductToBuy
                totalToPay={totalToPay}
                productsToBuy={productsToBuy}
                DeleteProductToBuy={DeleteProductToBuy}
                amountOther={amountOther}
                setAmountOther={setAmountOther}
                amountDiscount={amountDiscount}
                setAmountDiscount={setAmountDiscount}
                amountTip={amountTip}
                setAmountTip={setAmountTip}
                onOpen={onOpen}
                deleteCartToBuy={handleModalDeleteCart}
              />
            </Container>
          </GridItem>
        </Grid>
      </Box>
      <ModalPayments
        isOpen={isOpen}
        onClose={onClose}
        totalToPay={totalToPay}
        ClientList={ClientList}
        onSelected={setClientSelected}
        handlerPay={handlerPay}
        loadingSendPay={loadingSendPay}
        methodSelected={methodSelected}
        setMethodSelected={setMethodSelected}
      />
      <ModalWarning
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        DeleteProduct={deleteCartToBuy}
        loadingButton={loadingButton}
        text="¿Confirmas que quieres vacíar el carrito?"
      />
    </>
  );
};

export default Inicio;
