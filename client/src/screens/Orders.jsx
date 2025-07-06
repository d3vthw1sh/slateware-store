import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function Orders() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get("/api/orders/my", config);
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Box maxW="4xl" mx="auto" mt={10} p={6} color={textColor}>
        <Heading mb={6}>My Orders</Heading>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : orders.length === 0 ? (
          <Text>No orders found.</Text>
        ) : (
          <Stack spacing={6}>
            {orders.map((order) => (
              <Box
                key={order._id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                boxShadow="sm"
              >
                <Text>
                  <strong>ID:</strong> {order._id}
                </Text>
                <Text>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                </Text>
                <Text>
                  <strong>Status:</strong>{" "}
                  {order.isDelivered ? "Delivered" : "Processing"}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default Orders;
