"use client"

import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <button onClick={onClose} className="mb-8 p-2 hover:bg-gray-200 rounded-full">
            <X className="w-6 h-6" />
          </button>

          <nav className="space-y-4">
            <button
              onClick={() => {
                navigate("/manajemenMenu")
                onClose()
              }}
              className="w-full text-left px-4 py-3 bg-white rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => {
                navigate("/manajemenPesanan")
                onClose()
              }}
              className="w-full text-left px-4 py-3 bg-white rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Pesanan
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
