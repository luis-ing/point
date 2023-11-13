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
} from '@chakra-ui/react'

const ModalService = ({
    isOpen,
    onClose,
    saveProductData,
    dataForm,
    setDataForm,
    loadingButton
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
                <ModalHeader>Servicio</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={(e) => saveProductData(e)}>
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Nombre de servicio</FormLabel>
                            <InputGroup>
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder='Manicura'
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
                                    placeholder='Tratamiento de belleza cosmético para las uñas'
                                    name='descripcion'
                                    value={dataForm.descripcion}
                                    onChange={handlerChange}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Precio</FormLabel>
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

export default ModalService;
