"use client";

import { ArrowLeft, ChevronDown, ChevronUp, Table } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PesananCard({
  orders,
  expandedOrder,
  toggleOrder,
  handleSelesai,
}) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b px-4 py-4 flex items-center gap-4 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-gray-900 hover:text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Pesanan</h1>
      </div>

      <div className="p-4 space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:items-start">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border overflow-hidden"
          >
            <button
              onClick={() => toggleOrder(order.id)}
              className={`w-full px-4 py-3 flex items-center justify-between ${
                expandedOrder === order.id
                  ? "bg-blue-100"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 w-full">
                <Table size={20} className="text-gray-600" />
                <div className="flex justify-between w-full">
                  <p className="text-sm">
                    <span className="font-semibold">{order.tableNumber}</span>
                  </p>

                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">{order.orderNumber}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span>{order.code}</span>
                {expandedOrder === order.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </button>

            {expandedOrder === order.id && (
              <div className="px-4 py-4 border-t">
                <h3 className="text-sm font-semibold text-center mb-4 pb-3 border-b">
                  Rincian Pesanan
                </h3>

                {order.items.map((item, i) => (
                  <div key={i} className="pb-4 border-b last:border-b-0">
                    <h4 className="font-semibold text-sm mb-1">
                      {item.name} ({item.qty})
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {item.notes || "Tidak ada catatan"}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {expandedOrder === order.id && (
              <div className="px-4 pb-4 hidden md:block">
                <button
                  onClick={() => handleSelesai(order)}
                  className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {expandedOrder && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <button
            onClick={() =>
              handleSelesai(orders.find((o) => o.id === expandedOrder))
            }
            className="w-full bg-teal-700 text-white py-4 rounded-lg shadow-lg hover:bg-teal-800 transition-colors"
          >
            Selesai
          </button>
        </div>
      )}
    </div>
  );
}
