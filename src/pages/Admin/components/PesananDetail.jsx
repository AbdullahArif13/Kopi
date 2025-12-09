"use client"

import { ArrowLeft, Edit3 } from "lucide-react"

export default function PesananDetail({ selectedOrder, calculatePayment, handleSudahDibayar, handleBack, notes, setNotes }) {
  const payment = calculatePayment(selectedOrder)
  const totalItems = selectedOrder.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4 flex items-center gap-4 sticky top-0">
        <button onClick={handleBack} className="text-gray-900 hover:text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Pesanan</h1>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* items */}
        <div>
          <h2 className="font-semibold mb-4">Item yang dipesan ({totalItems})</h2>

          {selectedOrder.items.map((item, i) => (
            <div key={i} className="mb-4 border-b pb-4">
              <h3 className="font-semibold text-base mb-1">
                {item.name} ({item.qty})
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Edit3 size={16} />
                <span>{item.notes || "Tidak ada catatan"}</span>
              </div>

              <p className="font-semibold text-base">
                Rp{(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          ))}

          <div className="flex items-center gap-2 border-l-2 pl-3 text-gray-400 mt-3">
            <Edit3 size={18} />
            <input
              type="text"
              placeholder="Tambah catatan lainnya"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* payment summary */}
        <div className="bg-white border p-4 rounded-lg">
          <h3 className="text-center font-semibold mb-4">Rincian Pembayaran</h3>

          {[
            ["Subtotal", payment.subtotal],
            ["Biaya Tambahan", payment.biayaTambahan],
            ["Pembulatan", payment.pembulatan],
            ["Biaya lainnya", payment.biayaLainnya],
          ].map(([label, val], i) => (
            <div key={i} className="flex justify-between border-b pb-3 mb-3 last:border-none">
              <span>{label}</span>
              <span className="font-medium">Rp{val.toLocaleString("id-ID")}</span>
            </div>
          ))}

          <div className="flex justify-between text-lg font-semibold pt-2">
            <span>Total</span>
            <span>Rp{payment.total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleSudahDibayar}
          className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold"
        >
          Sudah Dibayar
        </button>
      </div>
    </div>
  )
}
