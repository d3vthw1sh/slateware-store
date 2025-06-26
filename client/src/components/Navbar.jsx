import {
  Box,
  Flex,
  IconButton,
  Input,
  useColorMode,
  useColorModeValue,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaSearch, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

function Navbar({ onFilter, onShowFavorites, cartCount = 0 }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("gray.700", "gray.100");
  const bgColor = useColorModeValue("whiteAlpha.800", "#0f1018");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBg = useColorModeValue("gray.100", "#1a1b26");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      px={6}
      py={3}
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Flex align="center" justify="space-between">
        {/* LEFT ICONS */}
        <Flex align="center" gap={3}>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Menu"
            fontSize="lg"
            color={iconColor}
            onClick={onOpen}
          />

          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Dark Mode"
            fontSize="lg"
            color={iconColor}
          />

          <IconButton
            icon={<FaSearch />}
            variant="ghost"
            aria-label="Search"
            fontSize="lg"
            color={iconColor}
            onClick={() => setShowSearch((prev) => !prev)}
          />

          {showSearch && (
            <Input
              placeholder="Search products..."
              size="sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              borderRadius="full"
              px={4}
              py={2}
              w={{ base: "100px", sm: "160px", md: "200px" }}
              bg={inputBg}
              _placeholder={{ color: placeholderColor }}
              transition="all 0.3s ease"
            />
          )}
        </Flex>

        {/* CENTER BRAND */}
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Text
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="xl"
            letterSpacing="wide"
            color={iconColor}
            _hover={{ textDecoration: "none", color: "teal.400" }}
          >
            SLATEWARE™
          </Text>
        </Box>

        {/* RIGHT ICONS */}
        <Flex align="center" gap={3}>
          <IconButton
            as={RouterLink}
            to="/signin"
            icon={<FaUser />}
            variant="ghost"
            aria-label="Login"
            fontSize="lg"
            color={iconColor}
          />

          <IconButton
            icon={<FaHeart />}
            variant="ghost"
            aria-label="Favorites"
            fontSize="lg"
            color={iconColor}
            onClick={() => onShowFavorites && onShowFavorites()}
          />

          <Box position="relative">
            <IconButton
              as={RouterLink}
              to="/cart"
              icon={<FaShoppingBag />}
              variant="ghost"
              aria-label="Cart"
              fontSize="lg"
              color={iconColor}
            />
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                fontSize="0.7em"
                colorScheme="red"
                borderRadius="full"
                px={2}
              >
                {cartCount}
              </Badge>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* DRAWER SIDEBAR */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg={useColorModeValue("white", "#1a1b26")}
          borderRightRadius="lg"
        >
          <DrawerCloseButton />
          <DrawerHeader
            fontWeight="bold"
            fontSize="lg"
            borderBottom="1px solid"
            borderColor="gray.300"
          >
            Browse Categories
          </DrawerHeader>
          <DrawerBody display="flex" flexDir="column" gap={4} py={6}>
            {["All", "Hoodies", "Bottoms", "T-Shirts", "Jackets"].map((cat) => (
              <Text
                key={cat}
                onClick={() => {
                  if (onFilter) onFilter(cat);
                  onClose();
                }}
                cursor="pointer"
                fontSize="md"
                fontWeight="medium"
                _hover={{ color: "teal.400", pl: 2, transition: "0.2s ease" }}
              >
                {cat}
              </Text>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
