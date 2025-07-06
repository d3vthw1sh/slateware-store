import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function OrderDetails() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get(`/api/orders/${id}`, config);
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchOrder();
  }, [id, user]);

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Box maxW="4xl" mx="auto" mt={10} p={6} color={textColor}>
        <Heading mb={4}>Order Details</Heading>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <>
            <Text>
              <strong>Order ID:</strong> {order._id}
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

            <Divider my={6} />

            <Heading size="md" mb={3}>
              Items:
            </Heading>
            <Stack spacing={3}>
              {order.orderItems.map((item, i) => (
                <Box key={i} borderWidth="1px" p={3} borderRadius="md">
                  <Text>
                    {item.name} x {item.qty}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    ${item.price} each
                  </Text>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}

export default OrderDetails;
