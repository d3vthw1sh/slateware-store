import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Input,
  useColorModeValue,
  Image,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link as RouterLink } from "react-router-dom";

function CartPage({ cart, setCart }) {
  const bg = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "gray.100");
  const boxBg = useColorModeValue("white", "gray.800");
  const outlineHoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const toast = useToast();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, parseInt(quantity) || 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setCheckoutSuccess(true);

    toast({
      title: "Order placed!",
      description: "Thanks for your purchase. We'll send you updates.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <Box bg={bg} minH="100vh">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <Flex minH="100vh" align="center" justify="center" px={6}>
        <Flex maxW="5xl" w="full" direction={{ base: "column", md: "row" }}>
          <Box p={8} flex={1} color={textColor}>
            <Heading fontSize="2xl" mb={6}>
              Your Cart
            </Heading>

            {cart.length === 0 ? (
              <Text>
                {checkoutSuccess
                  ? "Thank you for your purchase!"
                  : "Your cart is empty."}
              </Text>
            ) : (
              <VStack spacing={6} align="stretch">
                {cart.map((item) => (
                  <HStack
                    key={item._id}
                    justify="space-between"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    pb={4}
                  >
                    <HStack spacing={4}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="semibold" color={textColor}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          ${item.price} each
                        </Text>
                      </Box>
                    </HStack>
                    <HStack>
                      <Input
                        size="sm"
                        type="number"
                        w="60px"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, e.target.value)
                        }
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeItem(item._id)}
                        aria-label="Remove"
                      />
                    </HStack>
                  </HStack>
                ))}

                <Text fontWeight="medium" color={textColor}>
                  Total: ${total.toFixed(2)}
                </Text>

                <Button colorScheme="teal" onClick={handleCheckout}>
                  Checkout
                </Button>
              </VStack>
            )}
          </Box>

          <Box flex={1} p={8} textAlign="center" color={textColor}>
            <Heading fontSize="lg" mb={4}>
              Continue shopping
            </Heading>
            <Text mb={4}>Browse more items and add to your cart.</Text>
            <Button
              as={RouterLink}
              to="/products"
              variant="outline"
              borderRadius="full"
              color={textColor}
              borderColor={textColor}
              _hover={{ bg: outlineHoverBg }}
            >
              Back to Store
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

export default CartPage;
