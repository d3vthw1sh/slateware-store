import { Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const bgColor = useColorModeValue("white", "#0f1018");
  const labelColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        console.log("✅ Fetched products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleToggleFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
    if (!showOnlyFavorites) {
      setSelectedCategory("Favorites");
    } else {
      setSelectedCategory("All");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const isFavorited = favorites.includes(product._id);

    return showOnlyFavorites ? isFavorited : matchesCategory;
  });

  return (
    <>
      <Box bg={bgColor} minH="100vh">
        <Navbar
          onFilter={(cat) => {
            setSelectedCategory(cat);
            setShowOnlyFavorites(false);
          }}
          onShowFavorites={handleToggleFavorites}
        />
        <CategoryBar />

        <Box px={{ base: 4, md: 8 }} py={8}>
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={3}>
            Showing: {selectedCategory}
          </Text>

          {loading ? (
            <Text fontSize="sm" color={labelColor}>
              Loading...
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  price={`$${product.price}`}
                  image={product.image}
                  isFavorited={favorites.includes(product._id)}
                  onToggleFavorite={() => toggleFavorite(product._id)}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ProductPage;
