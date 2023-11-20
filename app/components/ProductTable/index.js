"use client";

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    FormControl,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorMode,
    useColorModeValue,
    useTheme
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { CurrencyFormat } from "@/app/utils";
import Autocomplete from "../Autocomplete";

const ProductTable = ({ listProduct, ClassificationList, handleModalAddInventory }) => {
    const color = useColorModeValue("gray.600", "gray.300");
    const { colorMode } = useColorMode();
    const theme = useTheme();
    const [dataProduct, setDataProduct] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [classificationSelected, setClassificationSelected] = useState({});

    useEffect(() => {
        const filtered = listProduct.filter(suggestion =>
            suggestion.idTipo === 1
                ? suggestion.producto.nombre.toLowerCase().includes(inputValue.toLowerCase())
                && (suggestion.producto.clasificacion.idClasificacion === classificationSelected.idClasificacion
                    || Object.keys(classificationSelected).length === 0)
                : suggestion.servicio.nombre.toLowerCase().includes(inputValue.toLowerCase())
        );
        setDataProduct(filtered);
    }, [inputValue, classificationSelected, listProduct]);

    useEffect(() => {
        setDataProduct(listProduct);
    }, [listProduct]);

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const colorHover = theme.colorsCustom.colorBackgroundOnHover[colorMode];
    return (
        <Box width="100%" margin="auto" color={color}>
            <Box mt={4} display="flex">
                <InputGroup paddingRight={2}>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={SearchIcon} />
                    </InputLeftElement>
                    <Input
                        autoFocus
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Buscar por nombre"
                        autoComplete="off"
                    />
                </InputGroup>
                <InputGroup>
                    <Autocomplete
                        suggestions={ClassificationList}
                        onSelected={setClassificationSelected}
                        placeholder="Selecciona clasificación"
                        isRequired={false}
                    />
                </InputGroup>
            </Box>
            <Box
                mt={2}
                minHeight="20vh"
                maxHeight="58vh"
                overflowY="scroll"
                css={{
                    "&::-webkit-scrollbar": {
                        width: "10px" // Ancho de la barra de desplazamiento
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(0, 0, 0, 0.2)", // Color de la barra de desplazamiento
                        borderRadius: "10px" // Borde redondeado de la barra de desplazamiento
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "rgba(0, 0, 0, 0.4)" // Cambio de color al pasar el mouse sobre la barra
                    }
                }}
            >
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>Producto</Th>
                                <Th>Clasificación</Th>
                                <Th>Stock</Th>
                                <Th>Precio</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dataProduct.map((item) => (
                                <Tr
                                    color={color}
                                    _hover={{ bgColor: colorHover }}
                                >
                                    <Td>
                                        <Avatar
                                            name="Aguacate Chiapas"
                                            src="https://www.gob.mx/cms/uploads/article/main_image/33769/SANDIA.jpg"
                                            size='sm'
                                        />
                                    </Td>
                                    <Td>
                                        {item.producto.nombre}
                                    </Td>
                                    <Td>
                                        <Badge
                                            colorScheme={item.producto?.clasificacion?.color}
                                            borderRadius={6}
                                        >
                                            {item.producto.clasificacion.nombre}
                                        </Badge>
                                    </Td>
                                    <Td>{item.producto.stock}</Td>
                                    <Td>{CurrencyFormat(item.producto.precio)}</Td>
                                    <Td>
                                        <IconButton
                                            color={color}
                                            variant="ghost"
                                            icon={<AddIcon />}
                                            onClick={() => handleModalAddInventory(item)}
                                        />
                                        <IconButton color={color} variant="ghost" icon={<EditIcon />} />
                                        {/* <IconButton color={color} variant="ghost" icon={<DeleteIcon />} /> */}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default ProductTable;