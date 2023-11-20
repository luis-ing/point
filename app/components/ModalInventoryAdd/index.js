"use client";

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Input,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';

const ModalInventoryAdd = ({
    isOpen,
    onClose,
    saveProductData,
    dataForm,
    setDataForm,
    loadingButton,
}) => {
    const color = useColorModeValue("gray.600", "gray.300");

    const handlerChange = (e) => {
        const { name, value } = e.target;
        setDataForm((e) => ({
            ...e,
            [name]: value,
        }));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Agregar inventario</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={(e) => saveProductData(e)}>
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Nombre de producto</FormLabel>
                            <InputGroup>
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder='Coca cola'
                                    name='nombre'
                                    isDisabled
                                    value={dataForm?.nombre}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Cantidad actual de producto</FormLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='12'
                                    name='stock'
                                    isDisabled
                                    value={dataForm?.stock}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Cantidad a ingresar</FormLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='1'
                                    autoFocus
                                    name='stockAdd'
                                    min={1}
                                    value={dataForm.stockAdd}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Cantidad total</FormLabel>
                            <InputGroup>
                                <Text pl={4} fontSize='lg'>{Number(dataForm.stockAdd) + dataForm?.stock}</Text>
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Precio de compra</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color={color}
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='0.00'
                                    name='precioCompra'
                                    value={dataForm?.precioCompra}
                                    min={0}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Precio de venta</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color={color}
                                    fontSize='1.2em'
                                    children='$'
                                />
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='0.00'
                                    name='precio'
                                    value={dataForm?.precio}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button
                            colorScheme="orange"
                            type="submit"
                            isLoading={loadingButton}
                        >
                            Guardar datos
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ModalInventoryAdd
