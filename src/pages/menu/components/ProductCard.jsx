import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product, qty, isAdded, onAdd, onIncrease, onDecrease }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
      <div className="h-40 sm:h-48 lg:h-56 bg-gray-200 flex-shrink-0">
        <img src={product.image || "/placeholder.svg"} className="w-full h-full object-cover" alt={product.name} />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-base sm:text-lg font-bold mb-4 text-green-700">Rp{product.price.toLocaleString()}</p>

        {!isAdded ? (
          <button
            onClick={onAdd}
            className="w-full border-2 border-green-700 text-green-700 py-2 rounded-full font-bold hover:bg-green-700 hover:text-white transition"
          >
            Tambahkan
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={onDecrease}
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition"
            >
              <Minus size={16} className="sm:w-5 sm:h-5" />
            </button>

            <span className="text-base sm:text-lg font-bold w-6 text-center">{qty}</span>

            <button
              onClick={onIncrease}
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-400 hover:text-white transition"
            >
              <Plus size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
