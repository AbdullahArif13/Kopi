import { useState } from "react";
import { ChevronRight, Plus, Minus, MenuIcon, ShoppingCart, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function MenuPage({ onCheckout, products = [], storeInfo = {} }) {
  const navigation = useNavigate();
  const [cart, setCart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [activeTab, setActiveTab] = useState("hot");

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🧊" },
    { id: "small", label: "Small Bite", icon: "🍰" },
  ];

  const handleAddToCart = (product) => {
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setProductQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecrease = (id) => {
    setProductQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        setAddedProducts((old) => {
          const ns = new Set(old);
          ns.delete(id);
          return ns;
        });
        return { ...prev, [id]: 0 };
      }
      return { ...prev, [id]: newQty };
    });

    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      return updated.filter((i) => i.quantity > 0);
    });
  };

  const handleIncrease = (id, price) => {
    setProductQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id, name: "", price, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);
  const totalPrice = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  const handleCheckoutClick = () => {
    onCheckout(cart);
  };

  return (
    <main className="bg-gray-100 min-h-screen w-full">

      {/* Top Buttons */}
      <div className="bg-gray-100 sticky top-0 z-50 px-4 py-3 flex justify-end gap-3 w-full sm:px-6 lg:px-8">
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg transition">
          <Search size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:shadow-lg transition">
          <MenuIcon size={18} />
        </button>
      </div>

      <div className="px-4 pt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Header Image */}
        <div className="w-full h-40 sm:h-52 lg:h-64 xl:h-72 rounded-lg overflow-hidden mb-6 bg-gray-300">
          <img
            src={storeInfo.headerImage || "/cozy-coffee-shop.png"}
            className="w-full h-full object-cover"
            alt="Kopi Boedaja"
          />
        </div>

        {/* Store Info */}
        <div className="sticky top-16 bg-gray-100 z-40 mb-6">
          <div className="bg-white border border-gray-300 rounded-3xl px-4 sm:px-5 py-3 sm:py-4 relative">

            {/* TEXT DI TENGAH */}
            <div className="text-center w-full pr-12"
              onClick={() => navigation("/rincian-pesanan")}

            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                {storeInfo.name || "KOPI BOEDAJA"}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                {storeInfo.hours || "Buka hari ini 00.00 - 23.59"}
              </p>
            </div>

            {/* ICON DI KANAN */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <ChevronRight size={24} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-28 sm:top-32 z-30 bg-gray-100 mb-6">
          <div className="bg-green-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-center mb-4 font-bold text-sm sm:text-base">
            Nomor Meja: {storeInfo.tableNumber || "Lantai 1 - 28"}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <button className="text-gray-700 min-w-[40px] hover:text-gray-900">
              <MenuIcon size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="border-r border-gray-400 h-6"></div>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm sm:text-base transition ${activeTab === c.id
                  ? "bg-gray-800 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-500"
                  }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
          sm:gap-6
          mb-32
        ">
          {products && products.length > 0 ? (
            products.map((p) => {
              const isAdded = addedProducts.has(p.id);
              const qty = productQuantities[p.id] || 0;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
                >
                  <div className="h-40 sm:h-48 lg:h-56 bg-gray-200 flex-shrink-0">
                    <img
                      src={p.image || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                      alt={p.name}
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 line-clamp-2">{p.name}</h3>
                    <p className="text-base sm:text-lg font-bold mb-4 text-green-700">Rp{p.price.toLocaleString()}</p>

                    {!isAdded ? (
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="w-full border-2 border-green-700 text-green-700 py-2 rounded-full font-bold text-sm sm:text-base hover:bg-green-700 hover:text-white transition"
                      >
                        Tambahkan
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <button
                          onClick={() => handleDecrease(p.id)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition flex-shrink-0"
                        >
                          <Minus size={16} className="sm:w-5 sm:h-5" />
                        </button>

                        <span className="text-base sm:text-lg font-bold w-6 text-center">
                          {qty}
                        </span>

                        <button
                          onClick={() => handleIncrease(p.id, p.price)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition flex-shrink-0"
                        >
                          <Plus size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">Memuat produk...</p>

            </div>
          )}
        </div>
      </div>

      {/* Checkout Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-t border-blue-800 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <ShoppingCart size={28} className="sm:w-8 sm:h-8" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-blue-200 text-xs">Total</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold truncate">
                  Rp{totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="bg-white text-blue-900 px-4 sm:px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap text-sm sm:text-base flex-shrink-0"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
