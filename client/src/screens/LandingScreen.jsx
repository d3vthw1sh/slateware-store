import {
  Box,
  Stack,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";

function LandingScreen() {
  const bgColor = useColorModeValue("white", "#0f1018");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <Navbar />
      <CategoryBar />

      <Box p={8} bg={bgColor} minH="100vh">
        {/* ✨ Main Landing Section */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={10}
          align="center"
          justify="space-between"
          maxW="6xl"
          mx="auto"
        >
          {/* 🛍️ Text Section */}
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Heading fontSize={{ base: "5xl", md: "6xl" }} mb={4}>
              Discover Minimal Style
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="lg">
              Shop modern essentials crafted for everyday life. Simple, clean,
              and timeless design—delivered to your doorstep.
            </Text>
          </Box>

          {/* 🖼️ Image Section */}
          <Box flex="1" w="full">
            <Image
              src="image\store-preview.png"
              alt="Minimal clothing collection"
              fallbackSrc=""
              borderRadius="xl"
              objectFit="contain"
              maxH={{ base: "3000px", md: "500px", lg: "6000px" }}
              w="100%"
            />
          </Box>
        </Stack>
      </Box>

      <Footer />
    </>
  );
}

export default LandingScreen;
