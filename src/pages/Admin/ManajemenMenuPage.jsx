"use client"

import { Search, Menu } from "lucide-react"
import useManajemenMenu from "./useManajemenMenu"
import CategoryTabs from "./components/CategoryTabs"
import MenuCard from "./components/MenuCard"

export default function ManajemenMenuPage() {
  const { activeCategory, setActiveCategory, categories, filteredItems } =
    useManajemenMenu()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">KOPI BOEDAJA</h1>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </header>

      <main className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}
''