"use client"

import { useState } from "react"
import { Search, Menu, Plus } from "lucide-react"
import useManajemenMenu from "./useManajemenMenu"
import CategoryTabs from "./components/CategoryTabs"
import MenuCard from "./components/MenuCard"
import AddMenuForm from "./components/AddMenuForm"
import AdminSidebar from "./components/AdminSidebar"

export default function ManajemenMenuPage() {
  const { activeCategory, setActiveCategory, categories, filteredItems, menuItems, addMenuItem, deleteMenuItem } =
    useManajemenMenu()
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)

  const searchedItems = filteredItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className="flex-1">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-xl font-bold">KOPI BOEDAJA</h1>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setShowSidebar(!showSidebar)}>
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

          <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </header>

        <main className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {searchedItems.map((item) => (
              <MenuCard key={item.id} item={item} onDelete={() => deleteMenuItem(item.id)} />
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="fixed bottom-6 right-6 bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </main>
      </div>

      {showAddForm && (
        <AddMenuForm
          categories={categories}
          onClose={() => setShowAddForm(false)}
          onSubmit={(newMenu) => {
            addMenuItem(newMenu)
            setShowAddForm(false)
          }}
        />
      )}
    </div>
  )
}
