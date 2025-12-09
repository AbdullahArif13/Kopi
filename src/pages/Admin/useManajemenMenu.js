import { useState, useEffect } from "react";
import { productService } from "../../service/MenuService";

export default function useManajemenMenu() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const data = await productService.getProducts();

      setMenuItems(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🥤" },
    { id: "small", label: "Small Bite", icon: "🍪" },
  ];

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter berdasarkan kategori dan search
  const filteredItems = menuItems.filter((item) => {
    const matchCategory = item.selectedCategories?.length
      ? item.selectedCategories.includes(activeCategory)
      : item.category === activeCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // CREATE
  const addMenuItem = async (newItem) => {
    const created = await productService.createProduct(newItem);
    setMenuItems((prev) => [...prev, created]);
  };

  // UPDATE (optional)
  const updateMenuItem = async (id, updates) => {
    const updated = await productService.updateProduct(id, updates);

    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? updated : item))
    );
  };

  // DELETE
  const deleteMenuItem = async (id) => {
    await productService.deleteProduct(id);

    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    searchQuery,
    setSearchQuery,
    isLoading,
  };
}
