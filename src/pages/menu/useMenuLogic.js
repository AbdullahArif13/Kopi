import { useState } from "react";

export default function useMenuLogic(initialProducts = []) {
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [activeTab, setActiveTab] = useState("hot");

  const addToCart = (product) => {
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setProductQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (product) => addToCart(product);

  const decreaseQty = (productId) => {
    setProductQuantities((prev) => {
      const newQty = (prev[productId] || 0) - 1;
      if (newQty <= 0) {
        setAddedProducts((old) => {
          const ns = new Set(old);
          ns.delete(productId);
          return ns;
        });
        return { ...prev, [productId]: 0 };
      }
      return { ...prev, [productId]: newQty };
    });

    setCart((prev) => prev
      .map((i) => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i)
      .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const filteredProducts = initialProducts.filter((p) => p.category === activeTab);

  return {
    cart,
    productQuantities,
    addedProducts,
    activeTab,
    setActiveTab,
    addToCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    filteredProducts,
  };
}
