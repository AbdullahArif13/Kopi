import { ChevronLeft, User, Phone, Mail, Building2 } from 'lucide-react';
import { generateOrderCode } from '../../../utils/generateOrderCode';

export default function RincianPembayaran({ onBack, onContinue, formData, onChange }) {


  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.tableNumber) {
      alert("Mohon lengkapi semua data");
      return;
    }
    // Generate Order Code on the fly before continue
    const generatedOrderCode = generateOrderCode();

    // Include orderCode in the form data if needed by parent
    onContinue({ ...formData, orderCode: generatedOrderCode });
  };

  const fields = [
    { label: "Nama Lengkap", field: "fullName", icon: User, required: true },
    { label: "Nomor Ponsel", field: "phone", icon: Phone, required: true },
    { label: "Email", field: "email", icon: Mail, required: true },
    { label: "Nomor Meja", field: "tableNumber", icon: Building2, required: true },
  ];

  return (
    <main className="bg-gray-100 min-h-screen pb-28 sm:pb-32">

      {/* Header */}
      <div className="bg-white sticky top-0 z-50 px-4 py-3 flex items-center gap-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg sm:text-xl">Rincian Pembayaran</h1>
        <div className="w-8"></div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">


        {fields.map(({ label, field, icon: Icon, required }) => (
          <div key={field}>
            <label className="block text-xs sm:text-sm font-semibold mb-2">
              {label}{required && <span className="text-red-500">*</span>}
            </label>

            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3 border">
              <Icon size={18} className="text-gray-500" />
              <input
                type="text"
                value={formData[field] || ""}
                onChange={e => onChange(field, e.target.value)}
                placeholder={`Masukkan ${label.toLowerCase()}`}
                className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-950"
        >
          Lanjut Pembayaran
        </button>
      </div>
    </main>
  );
}
