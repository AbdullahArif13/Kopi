import { useState } from "react";
import { ChevronLeft, Plus, Minus, Edit2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function RincianPesanan({ onBack, onToPembayaran, items = [] }) {
  const navigation = useNavigate();

  const [orderItems, setOrderItems] = useState(items);
  const [deliveryType, setDeliveryType] = useState("dine-in");

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter((item) => item.id !== id));
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: "Nama Menu",
      price: 0,
      quantity: 1,
      notes: "",
    };
    setOrderItems([...orderItems, newItem]);
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = 1000;
  const discount = 0;
  const otherFees = 2300;
  const total = subtotal + serviceCharge + otherFees - discount;

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="bg-gray-100 min-h-screen pb-28 sm:pb-32">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Pesanan</h1>
        <div className="w-8"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
        {/* Delivery Type */}
        <div className="bg-white rounded-lg border border-gray-300 px-4 sm:px-5 py-3 mb-6 flex items-center justify-between gap-4">
          <span className="font-semibold text-gray-700 text-sm sm:text-base">Tipe Pemesanan</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-gray-700 text-xs sm:text-sm">Makan di tempat</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600"></div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold">
              Item yang dipesan <span className="text-gray-600">({totalItems})</span>
            </h2>
            <button
              onClick={handleAddItem}
              className="border-2 border-gray-800 text-gray-800 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-800 hover:text-white transition flex-shrink-0"
            >
              + Tambah
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-4 sm:space-y-6">
            {orderItems && orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div key={item.id} className="border-b border-gray-300 pb-4 sm:pb-6">
                  <div className="flex justify-between items-start mb-3 gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        {item.notes || "Belum menambah catatan"}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition flex-shrink-0">
                      <Edit2 size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center gap-4 flex-wrap">
                    <p className="text-base sm:text-lg font-bold">Rp{item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded transition flex-shrink-0"
                      >
                        <Minus size={16} className="sm:w-5 sm:h-5" />
                      </button>
                      <span className="w-4 text-center font-bold text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded transition flex-shrink-0"
                      >
                        <Plus size={16} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-gray-500 text-xs sm:text-sm flex items-center gap-2">
                    <span>✏️</span>
                    <span>Tambah catatan lainnya</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Tidak ada item</p>
            )}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6">
          <h2 className="text-center font-bold text-lg sm:text-xl mb-6">
            Rincian Pembayaran
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-right">
                Rp{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Biaya Tambahan</span>
              <span className="font-semibold text-right">
                Rp{serviceCharge.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Pembulatan</span>
              <span className="font-semibold text-right">Rp{discount}</span>
            </div>

            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Biaya lainnya</span>
              <span className="font-semibold text-right">
                Rp{otherFees.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between items-center gap-4">
              <span className="text-base sm:text-lg font-bold">Total</span>
              <span className="text-base sm:text-lg font-bold text-right">
                Rp{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2">
            <p className="text-gray-600 text-xs sm:text-sm">Total Pembayaran</p>
            <p className="text-xl sm:text-2xl font-bold">Rp{total.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => {
              onToPembayaran && onToPembayaran(total);
              navigation("/rincian-pembayaran");
            }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-950 transition text-sm sm:text-base"
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </main>
  );
}
