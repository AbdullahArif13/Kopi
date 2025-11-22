import { useState } from "react";
import { ChevronLeft, Plus, Minus, Edit2 } from 'lucide-react';

export default function RincianPesanan({ onBack, onToPembayaran, items = [] }) {
  const [orderItems, setOrderItems] = useState(items);

  const handleQuantity = (id, newQty) => {
    setOrderItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i).filter(i => i.quantity > 0));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
        {orderItems.map(item => (
          <div key={item.id} className="mb-4 border-b border-gray-300 pb-3">
            <div className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>Rp{item.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => handleQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
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
          onClick={() => onToPembayaran && onToPembayaran(orderItems)}
          className="mt-4 w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-950 transition"
        >
          Lanjut Pembayaran
        </button>
      </div>
    </main>
  );
}
