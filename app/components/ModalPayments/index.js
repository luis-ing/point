"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Autocomplete from "../Autocomplete";

const ModalPayments = ({
        isOpen,
        onClose,
        totalToPay,
        ClientList,
        onSelected,
        handlerPay,
        loadingSendPay,
        methodSelected,
        setMethodSelected,
    }) => {
    const color = useColorModeValue('gray.600', 'gray.300');
    const [amountToPay, setAmountToPay] = useState(0);
    const [returnedInCash, setReturnedInCash] = useState(0);

    useEffect(() => {
        setAmountToPay(totalToPay);
    }, [totalToPay]);

    const paymentMethod = (e) => {
        setMethodSelected(Number(e));
    }

    useEffect(() => {
        setReturnedInCash(amountToPay - totalToPay);
    }, [amountToPay]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pago</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlerPay}>
            <ModalBody pb={2}>
                <FormControl>
                    <FormLabel>Seleccione Método de Pago</FormLabel>
                    <RadioGroup
                        defaultValue={`${methodSelected}`}
                        pb={4}
                        onChange={(e) => paymentMethod(e)}
                    >
                        <Stack>
                            <Radio value='1' name="Efectivo" colorScheme="orange">
                                Efectivo
                            </Radio>
                            <Radio value='2' name="Tarjeta de credito" colorScheme="orange">
                                Tarjeta de crédito/débito
                            </Radio>
                            <Radio value='3' name="Credito de cliente" colorScheme="orange">
                                Credito de cliente
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <Heading size='lg' pb={4}>{`Total a pagar $${totalToPay}`}</Heading>

                {methodSelected === 1 && (
                    <>
                        <FormControl mb={4}>
                            <FormLabel>Efectivo recibido</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color={color}
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input
                                    type="number"
                                    placeholder='0.00'
                                    value={amountToPay}
                                    onChange={(e) => setAmountToPay(e.target.value)}
                                    autoFocus
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Efectivo a devolver</FormLabel>
                            <Text fontSize='2xl'>{`$ ${returnedInCash}`}</Text>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Seleccione cliente (Opcional)</FormLabel>
                                <Autocomplete
                                    suggestions={ClientList}
                                    onSelected={onSelected}
                                    placeholder="Buscar"
                                    isRequired={false}
                                />
                        </FormControl>
                    </>
                )}

                {methodSelected === 2 && (
                    <>
                        <FormControl>
                            <FormLabel>Seleccione cliente (Opcional)</FormLabel>
                                <Autocomplete
                                    suggestions={ClientList}
                                    onSelected={onSelected}
                                    placeholder="Buscar"
                                    isRequired={false}
                                />
                        </FormControl>
                    </>
                )}

                {methodSelected === 3 && (
                    <>
                        <FormControl>
                            <FormLabel>Seleccione cliente</FormLabel>
                                <Autocomplete
                                    suggestions={ClientList}
                                    onSelected={onSelected}
                                    placeholder="Buscar"
                                    isRequired={true}
                                />
                        </FormControl>
                    </>
                )}

            </ModalBody>

            <ModalFooter>
                <Button
                    colorScheme="orange"
                    mr={3} type="submit"
                    isDisabled={methodSelected === 1 && !(amountToPay >= totalToPay)}
                    isLoading={loadingSendPay}
                >
                    Pagar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPayments;
