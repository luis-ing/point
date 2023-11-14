"use client";

import React, { useState, useEffect } from "react";
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { CurrencyFormat } from "@/app/utils";

const InventoryInformationGeneral = ({ listProduct }) => {
    const color = useColorModeValue("gray.600", "gray.300");
    const [stockValue, setStockValue] = useState(0);
    const [stockCost, setStockCost] = useState(0);
    const [estimatedProfit, setEstimatedProfit] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [outOfStock, setOutOfStock] = useState(0);
    const [inStock, setInStock] = useState(0);

    useEffect(() => {
        const totalStockValue = listProduct
            .reduce((acumulador, item) => acumulador + (item.producto.precio * item.producto.stock), 0);
        setStockValue(totalStockValue.toFixed(2));

        const totalStockCost = listProduct
            .reduce((acumulador, item) => acumulador + (item.producto.precioCompra * item.producto.stock), 0);
        setStockCost(totalStockCost.toFixed(2));

        setEstimatedProfit((totalStockValue - totalStockCost).toFixed(2));

        const totalLowStock = listProduct
            .reduce((acumulador, item) => acumulador +
                (item.producto.stock < item.producto.stockMin && item.producto.stock > 0 ? 1 : 0)
                , 0);
        setLowStock(totalLowStock);

        const totalOutOfStock = listProduct
            .reduce((acumulador, item) => acumulador +
                (item.producto.stock === 0 ? 1 : 0)
                , 0);
        setOutOfStock(totalOutOfStock);

        const totalInStock = listProduct
            .reduce((acumulador, item) => acumulador + 1, 0);
        setInStock(totalInStock);
    }, [listProduct]);

    return (
        <TableContainer pt={2} color={color}>
            <Table variant='simple' size="sm">
                <Thead>
                    <Tr>
                        <Th>Valor en stock</Th>
                        <Th>Costo de stock</Th>
                        <Th>Ganancia estimada</Th>
                        <Th>Stock bajo</Th>
                        <Th>Sin stock</Th>
                        <Th>En stock</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{CurrencyFormat(stockValue)}</Td>
                        <Td>{CurrencyFormat(stockCost)}</Td>
                        <Td>{CurrencyFormat(estimatedProfit)}</Td>
                        <Td>{lowStock}</Td>
                        <Td>{outOfStock}</Td>
                        <Td>{inStock}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default InventoryInformationGeneral;
