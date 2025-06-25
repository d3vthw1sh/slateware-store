// ✅ SignIn.jsx
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const isEmailInvalid = touched.email && !email.includes("@");
  const isPasswordInvalid = touched.password && password.length < 1;

  const bg = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "gray.100");
  const linkColor = useColorModeValue("black", "teal.300");
  const buttonBg = useColorModeValue("black", "white");
  const buttonColor = useColorModeValue("white", "black");
  const outlineHoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bg} minH="100vh">
      <Navbar />
      <Flex minH="100vh" align="center" justify="center" px={6}>
        <Flex maxW="5xl" w="full" direction={{ base: "column", md: "row" }}>
          <Box p={8} flex={1} color={textColor}>
            <Heading fontSize="2xl" mb={6}>
              Login
            </Heading>
            <FormControl isInvalid={isEmailInvalid} mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched({ ...touched, email: true })}
              />
              {isEmailInvalid && (
                <FormErrorMessage>
                  Please enter a valid email address.
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={isPasswordInvalid} mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
              />
              {isPasswordInvalid && (
                <FormErrorMessage>Please enter a password.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              bg={buttonBg}
              color={buttonColor}
              _hover={{ opacity: 0.85 }}
              w="full"
              mt={4}
            >
              Log In
            </Button>

            <Text mt={4} fontSize="sm">
              <Link color={linkColor}>Forgot your password?</Link>
            </Text>
          </Box>

          <Box flex={1} p={8} textAlign="center" color={textColor}>
            <Heading fontSize="lg" mb={4}>
              Create an account
            </Heading>
            <Text mb={4}>Streamline checkout and register today for free!</Text>
            <Button
              as={RouterLink}
              to="/signup"
              variant="outline"
              borderRadius="full"
              color={textColor}
              borderColor={textColor}
              _hover={{ bg: outlineHoverBg }}
            >
              Create an Account
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SignIn;
