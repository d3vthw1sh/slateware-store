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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../redux/slices/authSlice";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { user, loading, error } = useSelector((state) => state.auth);

  const isEmailInvalid = touched.email && !email.includes("@");
  const isUsernameInvalid = touched.username && username.length < 3;
  const isPasswordInvalid = touched.password && password.length < 6;

  const handleSubmit = () => {
    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (user) {
      toast({
        title: "Account created!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error]);

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
              Create Account
            </Heading>
            <FormControl isInvalid={isUsernameInvalid} mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched({ ...touched, username: true })}
              />
              {isUsernameInvalid && (
                <FormErrorMessage>
                  Username must be at least 3 characters.
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={isEmailInvalid} mb={4}>
              <FormLabel>Email</FormLabel>
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
                <FormErrorMessage>
                  Password must be at least 6 characters.
                </FormErrorMessage>
              )}
            </FormControl>

            <Button
              bg={buttonBg}
              color={buttonColor}
              _hover={{ opacity: 0.85 }}
              w="full"
              mt={4}
              isLoading={loading}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Text mt={4} fontSize="sm">
              Already have an account?{" "}
              <Link as={RouterLink} to="/signin" color={linkColor}>
                Sign In
              </Link>
            </Text>
          </Box>

          <Box flex={1} p={8} textAlign="center" color={textColor}>
            <Heading fontSize="lg" mb={4}>
              Join SLATEWARE™
            </Heading>
            <Text mb={4}>Access exclusive drops and early releases.</Text>
            <Button
              as={RouterLink}
              to="/"
              variant="outline"
              borderRadius="full"
              color={textColor}
              borderColor={textColor}
              _hover={{ bg: outlineHoverBg }}
            >
              Back to Home
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SignUp;
