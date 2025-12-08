import { useState, useMemo } from "react";

export default function useRincianPesanan(initialItems = []) {
  const [orderItems, setOrderItems] = useState(initialItems);

  const handleQuantityChange = (id, newQty) => {
    setOrderItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleAddItem = (item) => {
    setOrderItems(prev => [...prev, item]);
  };

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems]
  );

  const serviceCharge = 1000;
  const otherFees = 2300;
  const discount = 0;

  const total = subtotal + serviceCharge + otherFees - discount;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    orderItems,
    handleQuantityChange,
    handleAddItem,
    subtotal,
    serviceCharge,
    otherFees,
    discount,
    total,
    totalItems,
  };
}
