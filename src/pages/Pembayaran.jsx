import { useState } from "react";
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Pembayaran({ onBack, total = 0, paymentData = {} }) {
  const navigation = useNavigate();

  const [orderType, setOrderType] = useState("dine-in");

  // Extract payment breakdown data from props or use defaults
  const subtotal = paymentData.subtotal || 0;
  const serviceCharge = paymentData.serviceCharge || 0;
  const discount = paymentData.discount || 0;
  const otherFees = paymentData.otherFees || 0;
  const orderNumber = paymentData.orderNumber || "";

  const handleNewOrder = () => {
    navigation("/menu", { replace: true });
    onBack();
  };

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
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Pembayaran</h1>
        <div className="w-8"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl mx-auto">
        {/* Order Type Tabs */}
        <div className="bg-white rounded-lg border border-gray-300 px-4 sm:px-5 py-3 mb-6 flex items-center justify-between gap-4">
          <span className="font-semibold text-gray-700 text-sm sm:text-base">Tipe Pemesanan</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-gray-700 text-xs sm:text-sm">Makan di tempat</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600"></div>
            </div>
          </div>
        </div>

        {/* Order Number Section */}
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-bold mb-4">Nomor Pesanan</h2>
          <div className="bg-white rounded-lg border border-gray-300 px-6 sm:px-8 py-6 sm:py-8 text-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider break-all">
              {orderNumber || "Memuat..."}
            </p>
          </div>
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4 flex gap-3">
            <span className="text-lg sm:text-xl flex-shrink-0">⚠️</span>
            <p className="text-xs sm:text-sm text-gray-800">Silahkan tunjukkan 8 digit nomor pesanan ke staff kasir kami.</p>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6">
          <h2 className="text-center font-bold text-base sm:text-lg lg:text-xl mb-6">Rincian Pesanan</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold text-right">Rp{subtotal.toLocaleString()}</span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Biaya Tambahan</span>
              <span className="font-semibold text-right">Rp{serviceCharge.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Pembulatan</span>
              <span className="font-semibold text-right">Rp{discount}</span>
            </div>

            <div className="flex justify-between items-center gap-4 text-sm sm:text-base">
              <span className="text-gray-700">Biaya lainnya</span>
              <span className="font-semibold text-right">Rp{otherFees.toLocaleString()}</span>
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between items-center gap-4">
              <span className="text-base sm:text-lg font-bold">Total</span>
              <span className="text-base sm:text-lg font-bold text-right">Rp{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleNewOrder}
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-800 transition text-sm sm:text-base"
          >
            Pesan Baru
          </button>
        </div>
      </div>
    </main>
  );
}
