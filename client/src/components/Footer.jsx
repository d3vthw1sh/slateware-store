// components/Footer.jsx
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

function Footer() {
  const bg = useColorModeValue("white", "#0f1018"); // custom dark mode
  const textColor = useColorModeValue("gray.700", "gray.300");
  const linkHover = useColorModeValue("black", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bg} color={textColor} fontSize="sm" px={8} py={12}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start"
        maxW="6xl"
        mx="auto"
        gap={10}
      >
        {/* Info Column */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="md" mb={1}>
            INFO
          </Text>
          <Link _hover={{ color: linkHover }}>About Us</Link>
          <Link _hover={{ color: linkHover }}>Privacy Policy</Link>
          <Link _hover={{ color: linkHover }}>Terms & Conditions</Link>
        </Stack>

        {/* Online Store */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="md" mb={1}>
            ONLINE STORE
          </Text>
          <Link _hover={{ color: linkHover }}>How to Order</Link>
          <Link _hover={{ color: linkHover }}>Shipping</Link>
          <Link _hover={{ color: linkHover }}>Returns</Link>
        </Stack>

        {/* Contact */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="md" mb={1}>
            CONTACT
          </Text>
          <Text>Email: contact@slateware.com</Text>
          <Text>Phone: +855 123 456</Text>
        </Stack>

        {/* Language */}
        <Stack spacing={2}>
          <Text fontWeight="bold" fontSize="md" mb={1}>
            LANGUAGE
          </Text>
          <Text>EN / KH</Text>
        </Stack>
      </Flex>

      <Divider my={8} borderColor={borderColor} />

      <Text textAlign="center" fontSize="xs" color="gray.500">
        © 2025 SLATEWARE™ — Designed with ❤️ in Cambodia.
      </Text>
    </Box>
  );
}

export default Footer;
