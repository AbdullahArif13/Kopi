import { useState } from "react";
import { ChevronLeft, Plus, Minus, Pencil } from 'lucide-react';

export default function RincianPesanan({ onBack, onContinue, items = [], onEdit, onAddMore }) {
  const [orderItems, setOrderItems] = useState(items);

  const handleQuantity = (id, newQty) => {
    setOrderItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: newQty } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const serviceCharge = 1000;
  const discount = 0;
  const otherFees = 2300;
  const total = subtotal + serviceCharge + otherFees - discount;

  return (
    <main className="bg-gray-100 min-h-screen pb-28 sm:pb-32">
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg sm:text-xl">Rincian Pesanan</h1>
        <div className="w-8"></div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">Item yang dipesan ({orderItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
          <button
            onClick={onAddMore}
            className="text-green-600 font-medium text-sm flex items-center gap-1 border border-green-600 rounded-lg px-3 py-1.5 hover:bg-green-50 active:scale-95 transition-all"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {orderItems.map(item => (
          <div key={item.id} className="mb-4 border-b border-gray-300 pb-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <button
                onClick={() => onEdit && onEdit(item)}
                className="text-gray-500 hover:text-blue-600 transition p-1"
                aria-label="Edit item"
              >
                <Pencil size={18} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Rp{item.price.toLocaleString()}</span>

              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantity(item.id, item.quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button onClick={() => handleQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-white rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rp{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Biaya Tambahan</span>
            <span>Rp{serviceCharge.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Pembulatan</span>
            <span>Rp{discount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Biaya Lainnya</span>
            <span>Rp{otherFees.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp{total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => onContinue && onContinue(orderItems)}
          className="mt-4 w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-950 transition"
        >
          Lanjut Pembayaran
        </button>
      </div>
    </main>
  );
}
