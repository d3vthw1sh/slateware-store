import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({ name, price, image, isFavorited, onToggleFavorite }) {
  const bg = useColorModeValue("white", "#0f1018");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const priceColor = useColorModeValue("gray.500", "gray.400");
  const hoverBg = useColorModeValue("gray.100", "#1a1b26");
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d2f3a");

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      bg={bg}
      border={border}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "lg",
      }}
      cursor="pointer"
    >
      <Box overflow="hidden">
        <Image
          src={image}
          alt={name}
          fallbackSrc="https://via.placeholder.com/300x300?text=No+Image"
          w="100%"
          h="300px"
          objectFit="cover"
          transition="transform 0.4s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <VStack align="start" spacing={2} p={4}>
        <Text
          fontWeight="semibold"
          fontSize="lg"
          color={textColor}
          noOfLines={1}
        >
          {name}
        </Text>
        <Text fontSize="sm" color={priceColor}>
          {price}
        </Text>

        <HStack pt={2} spacing={3}>
          <Button
            size="sm"
            variant="outline"
            colorScheme="gray"
            _hover={{ bg: hoverBg }}
          >
            View
          </Button>

          <IconButton
            icon={isFavorited ? <FaHeart /> : <FaRegHeart />}
            aria-label="Favorite"
            size="sm"
            variant="ghost"
            color={
              isFavorited
                ? "red.400"
                : useColorModeValue("gray.500", "gray.400")
            }
            _hover={{ color: "red.400" }}
            onClick={onToggleFavorite}
          />
        </HStack>
      </VStack>
    </Box>
  );
}

export default ProductCard;
