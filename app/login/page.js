"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";
import {
  Box,
  Center,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  useToast,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import PersonIcon from "@mui/icons-material/Person";

const response = (data) => {
  let data1 = {
    ok: false,
    token: ""
  }
  if (data.usename === "luis.sanchez") {
    console.log("usuario correcto");
    data1 = {
      ok: true,
      token: "72D2$%GA"
    };
  }
  return data1;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleForm = async (event) => {
    event.preventDefault();
    // onOpen();
    setLoading(true);
    setTimeout(() => {
      
      const data = {
        usename: email,
        password: password
      };
      const respond = response(data);
      // console.log("router ", router);
  
      if (!respond.ok) {
        setLoading(false);
        toast({
          title: "Error, usuario o contraseña incorrecto.",
          position: "bottom-right",
          status: "error",
          isClosable: true
        });
        return console.log("Error");
      }
  
      const tokens = respond;
      console.log("tokens ", tokens);
      login(tokens);
      // onClose();
      setLoading(false);
      toast({
        title: `Welcome ${data.usename}!`,
        position: "bottom-right",
        status: "success",
        isClosable: true
      });
      return router.push("/home");
    }, 4000);

  };

  return (
    <>
      <Box w="100%" height="100vh" backgroundColor="#6f797b">
        <Center height="100%">
          <Card
            w="80%"
            height="80vh"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            borderRadius={10}
          >
            <Box width={["100%", "50%"]} height={["100%", "100%"]} display="flex" alignItems="center">
              <CardBody>
                <Center>
                  <Heading size="lg">LOGIN</Heading>
                </Center>
                <Center>
                  <Text py="2">Get started, let's go big!</Text>
                </Center>
                <Center>
                  <form onSubmit={handleForm}>
                    <Stack spacing={6}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon as={PersonIcon} />
                        </InputLeftElement>
                        <Input
                          type="text"
                          placeholder="Username"
                          onChange={e => setEmail(e.target.value)}
                          required
                          name="email"
                          id="email"
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <LockIcon />
                        </InputLeftElement>
                        <Input
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                          required
                          name="password"
                          id="password"
                        />
                      </InputGroup>
                      <Button isLoading={loading} type="submit" colorScheme="orange">
                        Login
                      </Button>
                    </Stack>
                  </form>
                </Center>
              </CardBody>
            </Box>
            <Box width={["100%", "50%"]} height={["0%", "100%"]}>
              <Image
                objectFit="cover"
                maxW={{ base: "100%" }}
                h='100%'
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
            </Box>
          </Card>
        </Center>
      </Box>
    </>
  );
};

export default Login;
