import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RincianPesanan from "./components/RincianPesanan";
import RincianPembayaran from "./components/RincianPembayaran";
import Pembayaran from "./components/Pembayaran";

import useRincianPesanan from "./useRincianPesanan";
import useRincianPembayaran from "./useRincianPembayaran";
import usePembayaran from "./usePembayaran";

export default function PembayaranPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("pesanan");
  const [paymentData, setPaymentData] = useState({});

  // Load cart from localStorage
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const pesananHook = useRincianPesanan(initialCart);
  const formHook = useRincianPembayaran();
  const pembayaranHook = usePembayaran(paymentData);

  // STEP: Pesanan → Form
  const goToRincianPembayaran = () => {
    const subtotal = pesananHook.subtotal;
    const serviceCharge = pesananHook.serviceCharge;
    const otherFees = pesananHook.otherFees;
    const discount = pesananHook.discount;
    const total = pesananHook.total;

    setPaymentData({
      items: pesananHook.orderItems,
      subtotal,
      serviceCharge,
      otherFees,
      discount,
      total
    });

    setStep("form");
  };

  // STEP: Form → Final Pembayaran
  const goToPembayaran = (formData) => {
    setPaymentData(prev => ({
      ...prev,
      customer: formData
    }));
    setStep("final");
  };

  // Placeholder for Edit functionality
  const handleEdit = (item) => {
    console.log("Edit item:", item);
    alert(`Edit functionality for ${item.name} is coming soon!`);
  };

  return (
    <>
      {step === "pesanan" && (
        <RincianPesanan
          onBack={() => navigate("/menu")}
          items={pesananHook.orderItems}
          onQuantityChange={pesananHook.handleQuantityChange}
          onContinue={goToRincianPembayaran}
          onEdit={handleEdit}
          onAddMore={() => navigate("/menu")}
        />
      )}

      {step === "form" && (
        <RincianPembayaran
          formData={formHook.formData}
          onChange={formHook.handleInputChange}
          onContinue={() => formHook.handleContinue(goToPembayaran)}
          onBack={() => setStep("pesanan")}
        />
      )}

      {step === "final" && (
        <Pembayaran
          paymentData={pembayaranHook}
          onBack={() => setStep("form")}
          onNewOrder={() => navigate("/menu")}
        />
      )}
    </>
  );
}
