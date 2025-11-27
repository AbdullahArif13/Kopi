"use client"

export default function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="flex items-center gap-2 px-4 pb-4 overflow-x-auto">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <span className="text-xl">📂</span>
      </button>

      <div className="h-8 w-px bg-gray-300 mx-1" />

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === category.id
              ? "bg-white shadow-md border-b-2 border-green-600"
              : "hover:bg-gray-100"
          }`}
        >
          <span>{category.icon}</span>
          <span className={activeCategory === category.id ? "font-semibold" : ""}>
            {category.label}
          </span>
        </button>
      ))}
    </div>
  )
}
