import { Box, Flex, Link, useColorModeValue, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const categories = [
  { label: "PRODUCTS", path: "/products" },
  { label: "NEW ARRIVALS", path: "/new-arrivals" },
  { label: "COLLECTIONS", path: "/collections" },
  { label: "SPECIAL", path: "/special" },
];

function CategoryBar() {
  const linkColor = useColorModeValue("gray.600", "gray.300");
  const linkHover = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor={borderColor}
      bg={useColorModeValue("white", "black")}
      px={{ base: 4, md: 8 }}
      py={2}
      overflowX="auto"
    >
      <Flex justify="center">
        <HStack spacing={{ base: 4, md: 8 }} whiteSpace="nowrap">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              as={RouterLink}
              to={cat.path}
              fontWeight="500"
              fontSize="sm"
              letterSpacing="wider"
              textTransform="uppercase"
              color={linkColor}
              position="relative"
              _hover={{
                color: linkHover,
                _after: {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  height: "2px",
                  width: "100%",
                  bg: linkHover,
                  transition: "width 0.3s ease",
                },
              }}
            >
              {cat.label}
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}

export default CategoryBar;
