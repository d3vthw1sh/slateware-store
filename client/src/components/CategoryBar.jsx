import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const categories = ["CLOTH", "NEW ARRIVALS", "COLLECTIONS", "SPECIAL"];

function CategoryBar() {
  const linkColor = useColorModeValue("gray.600", "gray.300");
  const linkHover = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor={borderColor}
      bg={useColorModeValue("white", "gray.800")}
      px={{ base: 4, md: 8 }}
      py={2}
      overflowX="auto"
    >
      <Flex justify="center">
        <HStack spacing={{ base: 4, md: 8 }} whiteSpace="nowrap">
          {categories.map((cat) => (
            <Link
              key={cat}
              as={RouterLink}
              to={`/${cat.toLowerCase().replace(" ", "-")}`}
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
              {cat}
            </Link>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}

export default CategoryBar;
