import { useState } from "react";
import { ChevronLeft, User, Phone, Mail, Building2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function RincianPembayaran({ onBack, onToPembayaran, total = 0 }) {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    tableNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinuePayment = () => {
        navigation("/pembayaran");

    if (
      formData.fullName &&
      formData.phone &&
      formData.email &&
      formData.tableNumber
    ) {
      const paymentData = {
        customerInfo: formData,
        total: total,
        // Backend will calculate these from the cart data
        subtotal: total - 1000 - 2300,
        serviceCharge: 1000,
        otherFees: 2300,
        discount: 0,
      };
      if (onToPembayaran) {
        onToPembayaran(total, paymentData);
      }

    } else {
      alert("Mohon lengkapi semua data");
    }
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

        {/* Customer Information Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6">
          <h2 className="text-base sm:text-lg font-bold mb-6">Informasi Pemesan</h2>

          {/* Full Name Field */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <User size={18} className="text-gray-500 flex-shrink-0 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Masukkan nama lengkap anda"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Nomor Ponsel <span className="text-gray-400 text-xs">(untuk info promo)</span>
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Phone size={18} className="text-gray-500 flex-shrink-0 sm:w-5 sm:h-5" />
              <input
                type="tel"
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Kirim struk ke email
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Mail size={18} className="text-gray-500 flex-shrink-0 sm:w-5 sm:h-5" />
              <input
                type="email"
                placeholder="email@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Table Number Field */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              Nomor Meja<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
              <Building2 size={18} className="text-gray-500 flex-shrink-0 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Lantai 1 - 28"
                value={formData.tableNumber}
                onChange={(e) => handleInputChange("tableNumber", e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm sm:text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-2">
            <p className="text-gray-600 text-xs sm:text-sm">Total Pembayaran</p>
            <p className="text-xl sm:text-2xl font-bold">Rp{total.toLocaleString()}</p>
          </div>
          <button
            onClick={handleContinuePayment}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-950 transition text-sm sm:text-base"
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </main>
  );
}
