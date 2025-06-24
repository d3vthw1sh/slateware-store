// components/Footer.jsx
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function Footer() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box bg={bg} color={textColor} fontSize="sm" mt={20} px={8} py={12}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        maxW="6xl"
        mx="auto"
        gap={10}
      >
        {/* Info Column */}
        <Stack spacing={2}>
          <Text fontWeight="bold">INFO</Text>
          <Link>About Us</Link>
          <Link>Privacy Policy</Link>
          <Link>Terms & Conditions</Link>
        </Stack>

        {/* Online Store */}
        <Stack spacing={2}>
          <Text fontWeight="bold">ONLINE STORE</Text>
          <Link>How to Order</Link>
          <Link>Shipping</Link>
          <Link>Returns</Link>
        </Stack>

        {/* Contact */}
        <Stack spacing={2}>
          <Text fontWeight="bold">CONTACT</Text>
          <Text>Email: contact@slateware.com</Text>
          <Text>Phone: +855 123 456</Text>
        </Stack>

        {/* Language */}
        <Stack spacing={2}>
          <Text fontWeight="bold">LANGUAGE</Text>
          <Text>EN / KH</Text>
        </Stack>
      </Flex>

      <Text textAlign="center" mt={10} fontSize="xs" color="gray.500">
        © 2025 SLATEWARE. Designed with ❤️ in Cambodia.
      </Text>
    </Box>
  );
}

export default Footer;
