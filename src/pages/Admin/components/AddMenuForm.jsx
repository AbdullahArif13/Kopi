"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AddMenuForm({ categories, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "hot",
    image: null,
    selectedCategories: [],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      id: Date.now(),
      name: formData.name,
      price: Number.parseInt(formData.price),
      category: formData.category,
      image: formData.image,
      selectedCategories: formData.selectedCategories,
    })
  }

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="w-full bg-white rounded-t-2xl md:rounded-2xl p-6 max-h-[90vh] overflow-y-auto md:max-w-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Tipe Makanan</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="space-y-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            {/* Nama */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                required
              />
            </div>

            {/* Harga */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Harga</label>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Rp</span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                  required
                />
              </div>
            </div>

            {/* Gambar */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Gambar</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setFormData({ ...formData, image: event.target?.result })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="preview"
                      className="w-32 h-32 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Input image</span>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Selesai
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
