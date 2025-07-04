import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  useColorModeValue,
  Image,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../redux/actions/cartActions";
import { useState } from "react";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // ✅ FIXED here

  const bg = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "gray.100");
  const outlineHoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const toast = useToast();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
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
                      <IconButton
                        icon={<Text>-</Text>}
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          dispatch(updateQuantity(item._id, item.quantity - 1))
                        }
                        isDisabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      />
                      <Text px={2}>{item.quantity}</Text>
                      <IconButton
                        icon={<Text>+</Text>}
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          dispatch(updateQuantity(item._id, item.quantity + 1))
                        }
                        aria-label="Increase quantity"
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item._id))}
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
