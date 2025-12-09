"use client";

import { useState } from "react";
import { Search, Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useManajemenMenu from "./useManajemenMenu";
import CategoryTabs from "./components/CategoryTabs";
import MenuCard from "./components/MenuCard";
import AdminSidebar from "./components/AdminSidebar";

export default function ManajemenMenuPage() {
  const navigate = useNavigate();
  const {
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    deleteMenuItem,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useManajemenMenu();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      <div className="flex-1 w-full">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-xl font-bold">KOPI BOEDAJA</h1>

            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-4">
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </header>

        <main className="p-4 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mb-4"></div>
                <p>Sedang mencari menu...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onDelete={() => deleteMenuItem(item.id)}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 text-center px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  Menu tidak ditemukan
                </h3>
                <p className="text-sm">
                  Maaf, menu "{searchQuery}" tidak tersedia dikategori ini.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/add-menu")}
            className="fixed bottom-6 right-6 bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </main>
      </div>
    </div>
  );
}
