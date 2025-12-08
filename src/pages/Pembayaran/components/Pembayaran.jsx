import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { generateOrderCode } from '../../../utils/generateOrderCode';

export default function Pembayaran({ onBack, paymentData = {}, onNewOrder }) {
  const subtotal = paymentData.subtotal || 0;
  const serviceCharge = paymentData.serviceCharge || 0;
  const discount = paymentData.discount || 0;
  const otherFees = paymentData.otherFees || 0;
  const orderCode = generateOrderCode()

  const total = subtotal + serviceCharge + otherFees - discount;

  return (
    <main className="bg-gray-100 min-h-screen pb-28 sm:pb-32">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 border-b border-gray-200">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg sm:text-xl font-bold flex-1 text-center">Pembayaran</h1>
        <div className="w-8"></div>
      </div>

      {/* Rincian Pembayaran */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl mx-auto">

        {/* Order Code Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nomor Pesanan
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg py-4 text-center">
            <span className="font-mono text-2xl font-bold tracking-[0.2em] text-gray-800">
              {orderCode}
            </span>
          </div>

          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-3 text-yellow-800">
            <AlertTriangle size={20} className="shrink-0 mt-0.5 text-yellow-600" />
            <p className="text-sm font-medium">
              Silahkan tunjukan 8 digit nomor pesanan ke staff kasir kami
            </p>
          </div>
        </div>

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
              <span className="font-semibold text-right">Rp{discount.toLocaleString()}</span>
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

      {/* Tombol Pesan Baru */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onNewOrder}
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-800 transition text-sm sm:text-base"
          >
            Pesan Baru
          </button>
        </div>
      </div>
    </main>
  );
}
