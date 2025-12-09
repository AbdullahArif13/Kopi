import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useMenuLogic(initialProducts = []) {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [productQuantities, setProductQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [activeTab, setActiveTab] = useState("hot");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const quantities = {};
    const added = new Set();

    cart.forEach((item) => {
      quantities[item.id] = item.quantity;
      if (item.quantity > 0) added.add(item.id);
    });

    setProductQuantities(quantities);
    setAddedProducts(added);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (product) => addToCart(product);

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredProducts = initialProducts.filter(
    (p) =>
      p.category === activeTab &&
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const onCheckout = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/pembayaran");
  };

  return {
    cart,
    productQuantities,
    addedProducts,
    activeTab,
    onCheckout,
    setActiveTab,
    addToCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    isLoading,
  };
}
