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
    Text,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import WarningIcon from '@mui/icons-material/Warning';

const ModalWarning = ({
    isOpen,
    onClose,
    DeleteProduct,
    loadingButton,
    text = '',
}) => {
    const color = useColorModeValue("orange.400", "orange.300");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Icon as={WarningIcon} color={color} />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize='xl'>{text}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="orange"
                        type="submit"
                        isLoading={loadingButton}
                        onClick={DeleteProduct}
                    >
                        Confirmar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalWarning;