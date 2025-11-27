"use client"

import { useState } from "react"

export default function useManajemenPesanan() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [notes, setNotes] = useState("")

  const [orders] = useState([
    {
      id: 1,
      table: "Meja 01",
      code: "A123",
      items: [
        { name: "Cappuccino", quantity: 2, price: 23000, notes: "" },
        { name: "Latte", quantity: 1, price: 25000, notes: "Less sugar" },
      ]
    },
  ])

  const calculatePayment = (order) => {
    const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const biayaTambahan = 1000
    const pembulatan = 0
    const biayaLainnya = Math.floor(subtotal * 0.1)
    const total = subtotal + biayaTambahan + pembulatan + biayaLainnya

    return { subtotal, biayaTambahan, pembulatan, biayaLainnya, total }
  }

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  const handleSelesai = (order) => {
    setSelectedOrder(order)
    setExpandedOrder(null)
  }

  const handleSudahDibayar = () => {
    alert(`Pesanan ${selectedOrder.code} telah selesai dibayar`)
    setSelectedOrder(null)
    setNotes("")
  }

  const handleBack = () => setSelectedOrder(null)

  return {
    orders,
    selectedOrder,
    expandedOrder,
    notes,
    setNotes,
    toggleOrder,
    handleSelesai,
    handleSudahDibayar,
    handleBack,
    calculatePayment
  }
}
