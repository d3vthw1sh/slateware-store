import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import Navbar from "../components/Navbar";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Box maxW="lg" mx="auto" mt={10} p={6}>
        <Heading mb={6}>My Profile</Heading>

        {user ? (
          <Stack spacing={4}>
            <Text>
              <strong>Name:</strong> {user.name || "N/A"}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>

            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Text>You're not logged in.</Text>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
