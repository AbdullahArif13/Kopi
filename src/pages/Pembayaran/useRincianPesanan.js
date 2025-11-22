import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRincianPesanan(initialItems = []) {
  const navigation = useNavigate();
  const [orderItems, setOrderItems] = useState(initialItems);

  const handleQuantityChange = (id, newQty) => {
    setOrderItems(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: newQty } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const handleAddItem = (newItem) => {
    setOrderItems(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = 1000;
  const discount = 0;
  const otherFees = 2300;
  const total = subtotal + serviceCharge + otherFees - discount;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const goToRincianPembayaran = (onToPembayaran) => {
    if (onToPembayaran) onToPembayaran(orderItems);
    navigation("/rincian-pembayaran");
  };

  return {
    orderItems,
    handleQuantityChange,
    handleAddItem,
    subtotal,
    serviceCharge,
    discount,
    otherFees,
    total,
    totalItems,
    goToRincianPembayaran,
  };
}
