"use client";

import { useEffect, useState } from "react";
import { orderService } from "../../service/orderService";

export default function useManajemenPesanan() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notes, setNotes] = useState("");

  // Fetch orders
  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      const data = await orderService.getOrders();
      if (isMounted) setOrders(data);
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleOrder = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const handleBack = () => {
    setSelectedOrder(null);
    setNotes("");
  };

  const handleSelesai = (order) => {
    setSelectedOrder(order);

    setExpandedOrder(null);
  };

  const handleSudahDibayar = async () => {
    if (!selectedOrder) return;

    await orderService.payOrder(selectedOrder.id);

    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));

    setSelectedOrder(null);
    setNotes("");
  };

  const calculatePayment = (order) => {
    const subtotal = order.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    const biayaTambahan = 0;
    const pembulatan = 0;
    const biayaLainnya = 0;

    const total = subtotal + biayaTambahan + pembulatan + biayaLainnya;

    return {
      subtotal,
      biayaTambahan,
      pembulatan,
      biayaLainnya,
      total,
    };
  };

  return {
    orders,
    selectedOrder,
    expandedOrder,
    toggleOrder,
    handleSelesai,
    handleSudahDibayar,
    handleBack,
    notes,
    setNotes,
    calculatePayment,
    setSelectedOrder,
  };
}
