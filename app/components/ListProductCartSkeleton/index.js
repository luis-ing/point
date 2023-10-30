import React from "react";
import {
  Box,
  Heading,
  Icon,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Center,
  Text,
  Skeleton,
  Card,
  CardHeader,
  Flex,
  Avatar,
  SkeletonCircle
} from "@chakra-ui/react";

const ListProductCartSkeleton = () => {
  const numberCicle = Array.from({ length: 3 }, (_, index) => 0 + index);
  return (
    <div>
      {numberCicle.map((number, index) =>
        <Card key={index} borderRadius={8} mt={2} mb={2} ml={1} mr={1}>
          <CardHeader pt={3} pb={3} width="100%">
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <SkeletonCircle size="12" />
                <Box>
                  <Skeleton>
                    <Text fontSize="sm" color="MenuText">
                      Nombre
                    </Text>
                  </Skeleton>
                  <Skeleton mt={1}>
                    <Text fontSize="10px" color="gray.500">
                      0 en inventario
                    </Text>
                  </Skeleton>
                </Box>
              </Flex>
              <Box>
                <Skeleton>
                  <Text fontSize="sm" color="MenuText">
                    Precio
                  </Text>
                </Skeleton>
              </Box>
            </Flex>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default ListProductCartSkeleton;
