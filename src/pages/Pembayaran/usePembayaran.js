import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function usePembayaran(initialTotal = 0, paymentData = {}) {
  const navigation = useNavigate();
  const [total, setTotal] = useState(initialTotal);

  const subtotal = paymentData.subtotal || 0;
  const serviceCharge = paymentData.serviceCharge || 0;
  const discount = paymentData.discount || 0;
  const otherFees = paymentData.otherFees || 0;
  const orderNumber = paymentData.orderNumber || "";

  const handleNewOrder = (onBack) => {
    navigation("/menu", { replace: true });
    if (onBack) onBack();
  };

  return {
    total,
    subtotal,
    serviceCharge,
    discount,
    otherFees,
    orderNumber,
    handleNewOrder,
  };
}
