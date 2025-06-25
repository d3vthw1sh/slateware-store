import {
  Box,
  VStack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

function Sidebar({ onCategorySelect }) {
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const categories = ["All", "Hoodies", "Bottoms", "T-Shirts", "Jackets"];

  return (
    <Box
      w={{ base: "full", md: "250px" }}
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      p={4}
    >
      <Heading size="md" mb={4}>
        Categories
      </Heading>
      <VStack align="stretch" spacing={3}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="ghost"
            justifyContent="start"
            onClick={() => onCategorySelect(cat)}
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          >
            {cat}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}

export default Sidebar;
