"use client"

export default function MenuCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-300 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
        <p className="text-lg font-bold mb-3">Rp{item.price.toLocaleString("id-ID")}</p>

        <button className="w-full py-2 px-4 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
          Tambahkan
        </button>
      </div>
    </div>
  )
}
