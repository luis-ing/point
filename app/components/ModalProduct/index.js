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
} from '@chakra-ui/react';
import Autocomplete from '../Autocomplete';

const ModalProduct = ({
    isOpen,
    onClose,
    saveProductData,
    SupplierList,
    setSupplierSelected,
    ClassificationList,
    setClassificationSelected,
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
                <ModalHeader>Producto</ModalHeader>
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
                                    autoFocus
                                    name='nombre'
                                    value={dataForm.nombre}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Descripción (Opcional)</FormLabel>
                            <InputGroup>
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder='Bebida carbonatada'
                                    name='descripcion'
                                    value={dataForm.descripcion}
                                    onChange={handlerChange}
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
                                    value={dataForm.precio}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Clasificación</FormLabel>
                            <Autocomplete
                                suggestions={ClassificationList}
                                onSelected={setClassificationSelected}
                                placeholder="Buscar Clasificación"
                                isRequired={false}
                                value={dataForm.clasificacion?.nombre}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Proveedor</FormLabel>
                            <Autocomplete
                                suggestions={SupplierList}
                                onSelected={setSupplierSelected}
                                placeholder="Buscar Proveedor"
                                isRequired={false}
                                value={dataForm.proveedor?.nombre}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Stock mínimo</FormLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='0'
                                    name='stockMin'
                                    value={dataForm.stockMin}
                                    onChange={handlerChange}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Stock máximo</FormLabel>
                            <InputGroup>
                                <Input
                                    type="number"
                                    autoComplete="off"
                                    placeholder='0'
                                    name='stockMax'
                                    value={dataForm.stockMax}
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

export default ModalProduct;
