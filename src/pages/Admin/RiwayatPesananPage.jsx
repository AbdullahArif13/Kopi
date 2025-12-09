"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Table, ChevronDown, ChevronUp, Clock, CheckCircle, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import { orderService } from "../../service/orderService";

export default function RiwayatPesananPage() {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        async function loadData() {
            const allOrders = await orderService.getOrders();
            const history = allOrders.filter(o => o.status === 'done');
            setOrders(history);
        }
        loadData();
    }, []);

    const toggleOrder = (id) => {
        setExpandedOrder((prev) => (prev === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar
                isOpen={showSidebar}
                onClose={() => setShowSidebar(false)}
            />

            <div className="flex-1 w-full pb-24">
                {/* Header */}
                <div className="bg-white border-b px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">Riwayat Pesanan</h1>
                    </div>
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* List Content */}
                <div className="p-4 space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:items-start">
                    {orders.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>Belum ada riwayat pesanan.</p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleOrder(order.id)}
                                    className={`w-full px-4 py-4 flex items-center justify-between transition-colors ${expandedOrder === order.id
                                        ? "bg-teal-50"
                                        : "bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-800">
                                                {order.tableNumber}
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">
                                                #{order.orderNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-500">
                                        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">Selesai</span>
                                        {expandedOrder === order.id ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </button>

                                {expandedOrder === order.id && (
                                    <div className="px-4 py-4 border-t border-gray-100 bg-gray-50/50">
                                        <div className="mb-3 flex justify-between items-center text-xs text-gray-400">
                                            <span>Waktu Pesanan:</span>
                                            <span>{order.createdAt || "2023-12-09 12:00"}</span>
                                        </div>

                                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Detail Menu
                                        </h3>

                                        <div className="space-y-2">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex justify-between items-start text-sm">
                                                    <span className="text-gray-700">
                                                        <span className="font-semibold">{item.qty}x</span> {item.name}
                                                    </span>
                                                    <span className="text-gray-900 font-medium">
                                                        Rp {((item.price || 0) * (item.qty || 1)).toLocaleString("id-ID")}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {order.notes && (
                                            <div className="mt-3 pt-2 border-t border-gray-200">
                                                <p className="text-xs text-gray-500 italic">" {order.notes} "</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
