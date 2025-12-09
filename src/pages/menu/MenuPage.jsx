import { useState, useEffect } from "react";
import { MenuIcon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMenuLogic from "./useMenuLogic";
import ProductCard from "./components/ProductCard";
import CheckoutFooter from "./components/CheckoutFooter";
import Tabs from "./components/Tabs";
import StoreHeader from "./components/StoreHeader";
import Sidebar from "../../components/Sidebar";

// Import service
import { productService } from "../../service/MenuService";

export default function MenuPage({ storeInfo = {} }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data dari API/service
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products dari service
  useEffect(() => {
    async function loadData() {
      const data = await productService.getProducts();
      setProducts(data);
      setLoadingProducts(false);
    }

    loadData();
  }, []);

  const {
    cart,
    addedProducts,
    productQuantities,
    activeTab,
    setActiveTab,
    filteredProducts,
    addToCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
    onCheckout,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useMenuLogic(products);

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🧊" },
    { id: "small", label: "Small Bite", icon: "🍰" },
  ];

  return (
    <main className="bg-gray-100 min-h-screen w-full pb-32">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-gray-100 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-full bg-white shadow"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
        >
          <MenuIcon size={18} />
        </button>
      </div>

      {/* Store Header */}
      <div className="px-4 pt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <StoreHeader storeInfo={storeInfo} onClick={() => navigate("/pembayaran")} />

        <div className="w-full py-3 mb-6 rounded-lg text-center text-white font-bold shadow-sm" style={{ backgroundColor: '#246800' }}>
          Nomor Meja: Lantai 1 - 28
        </div>

        <div className="sticky top-28 z-30 bg-gray-100 mb-6 w-fit">
          <Tabs categories={categories} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-32">
          {loadingProducts ? (
            <div className="col-span-full text-center py-20">Loading produk...</div>
          ) : isLoading ? (
            <div className="col-span-full text-center py-20">Mencari menu...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={productQuantities[p.id] || 0}
                isAdded={addedProducts.has(p.id)}
                onAdd={() => addToCart(p)}
                onIncrease={() => increaseQty(p)}
                onDecrease={() => decreaseQty(p.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              Menu tidak ditemukan untuk "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {cart.length > 0 && (
        <CheckoutFooter totalItems={totalItems} totalPrice={totalPrice} onCheckout={() => onCheckout(cart)} />
      )}
    </main>
  );
}
