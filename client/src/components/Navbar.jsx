import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaSearch, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box px={4} py={2} borderBottom="1px solid" borderColor="gray.200">
      <Flex align="center">
        {/* LEFT SIDE: ☰ 🌓 🔍 */}
        <Flex align="center" gap={2}>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Menu"
            fontSize="lg"
            color={iconColor}
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
          />
        </Flex>

        {/* CENTER: BRAND */}
        <Spacer />
        <Text fontWeight="bold" fontSize="xl" letterSpacing="wide">
          SLATEWARE
        </Text>
        <Spacer />

        {/* RIGHT SIDE: Login ❤️ 🛍️ */}
        <Flex align="center" gap={4}>
          <IconButton
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
          />
          <IconButton
            icon={<FaShoppingBag />}
            variant="ghost"
            aria-label="Cart"
            fontSize="lg"
            color={iconColor}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
