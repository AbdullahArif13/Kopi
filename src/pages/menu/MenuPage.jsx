import { Search, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMenuLogic from "./useMenuLogic";
import ProductCard from "./components/ProductCard";
import CheckoutFooter from "./components/CheckoutFooter";
import Tabs from "./components/Tabs";
import StoreHeader from "./components/StoreHeader";
import { productsDummy } from "../../data/productsData";

export default function MenuPage({ products = [], storeInfo = {} }) {
  const navigate = useNavigate();
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
  } = useMenuLogic(products);

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🧊" },
    { id: "small", label: "Small Bite", icon: "🍰" },
  ];

  return (
    <main className="bg-gray-100 min-h-screen w-full pb-32">

      {/* Top Buttons */}
      <div className="sticky top-0 z-50 bg-gray-100 px-4 py-3 flex justify-end gap-3 w-full sm:px-6 lg:px-8">
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg transition">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg transition">
          <MenuIcon size={18} />
        </button>
      </div>

      {/* Header */}
      <div className="px-4 pt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full h-40 sm:h-52 lg:h-64 xl:h-72 rounded-lg overflow-hidden mb-6 bg-gray-300">
          <img
            src={storeInfo.headerImage || "/cozy-coffee-shop.png"}
            className="w-full h-full object-cover"
            alt={storeInfo.name || "KOPI BOEDAJA"}
          />
        </div>

        <StoreHeader storeInfo={storeInfo} onClick={() => navigate("/rincian-pesanan")} />

        {/* Tabs */}
        <div className="sticky top-28 sm:top-32 z-30 bg-gray-100 mb-6">
          <div className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center mb-4 font-bold text-sm sm:text-base">
            Nomor Meja: {storeInfo.tableNumber || "Lantai 1 - 28"}
          </div>
          <Tabs categories={categories} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-32">
          {productsDummy.length > 0
            ? productsDummy.map((p) => (
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
            : <div className="col-span-full text-center py-12 text-gray-500 text-sm sm:text-base">Memuat produk...</div>
          }
        </div>
      </div>

      {/* Checkout Footer */}
      {cart.length > 0 && <CheckoutFooter totalItems={totalItems} totalPrice={totalPrice} onCheckout={() => onCheckout(cart)} />}
    </main>
  );
}
