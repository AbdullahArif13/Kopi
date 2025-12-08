"use client"

import { X, LayoutDashboard, Coffee, LogOut, Settings, ClipboardList } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { label: "Manajemen Menu", path: "/manajemenMenu", icon: <Coffee size={20} /> },
    { label: "Daftar Pesanan", path: "/manajemenPesanan", icon: <LayoutDashboard size={20} /> },
    { label: "Riwayat Pesanan", path: "/riwayatPesanan", icon: <ClipboardList size={20} /> },
  ]

  return (
    <>
      {/* Overlay with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs text-gray-500 mt-1">Kopi Boedaja</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  onClose()
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                  ? "bg-teal-50 text-teal-700 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span className={`transition-transform duration-200 ${location.pathname === item.path ? "scale-110" : "group-hover:scale-110"
                  }`}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors font-medium">
              <LogOut size={18} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
