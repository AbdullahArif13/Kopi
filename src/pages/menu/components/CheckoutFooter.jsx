import { ShoppingCart } from "lucide-react";

export default function CheckoutFooter({ totalItems, totalPrice, onCheckout }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-t border-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <ShoppingCart size={28} className="sm:w-8 sm:h-8" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">{totalItems}</span>
          </div>
          <div className="min-w-0">
            <p className="text-blue-200 text-xs">Total</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold truncate">Rp{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="bg-white text-blue-900 px-4 sm:px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap text-sm sm:text-base flex-shrink-0"
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
}
