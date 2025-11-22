import { useState } from "react";
import RincianPesanan from "./Components/RincianPesanan";
import RincianPembayaran from "./Components/RincianPembayaran";
import Pembayaran from "./Components/Pembayaran";

import useRincianPesanan from "./useRincianPesanan";
import useRincianPembayaran from "./useRincianPembayaran";
import usePembayaran from "./usePembayar";

export default function PembayaranPage() {
  const [currentStep, setCurrentStep] = useState("rincian-pesanan"); // steps: rincian-pesanan, rincian-pembayaran, pembayaran
  const [paymentData, setPaymentData] = useState({});
  const [total, setTotal] = useState(0);

  // Hook untuk Rincian Pesanan
  const pesananHook = useRincianPesanan([
    { id: "1", name: "Kopi Susu", price: 12000, quantity: 1, notes: "" },
    { id: "2", name: "Cappuccino", price: 15000, quantity: 2, notes: "" },
  ]);

  // Hook untuk Rincian Pembayaran
  const pembayaranFormHook = useRincianPembayaran(total);

  // Hook untuk Pembayaran final
  const pembayaranHook = usePembayaran(total, paymentData);

  const handleBack = () => {
    if (currentStep === "rincian-pembayaran") setCurrentStep("rincian-pesanan");
    else if (currentStep === "pembayaran") setCurrentStep("rincian-pembayaran");
  };

  const handleToRincianPembayaran = (items) => {
    // Hitung total dari items
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const serviceCharge = 1000;
    const otherFees = 2300;
    const discount = 0;
    const total = subtotal + serviceCharge + otherFees - discount;

    setTotal(total);
    setPaymentData({ subtotal, serviceCharge, otherFees, discount, items });
    setCurrentStep("rincian-pembayaran");
  };

  const handleToPembayaran = (formData) => {
    // Gabungkan data form dan total
    setPaymentData((prev) => ({
      ...prev,
      customerInfo: formData,
      total,
    }));
    setCurrentStep("pembayaran");
  };

  return (
    <>
      {currentStep === "rincian-pesanan" && (
        <RincianPesanan
          onBack={() => console.log("Kembali ke menu")}
          items={pesananHook.orderItems}
          onToPembayaran={handleToRincianPembayaran}
        />
      )}

      {currentStep === "rincian-pembayaran" && (
        <RincianPembayaran
          onBack={handleBack}
          total={total}
          onToPembayaran={handleToPembayaran}
        />
      )}

      {currentStep === "pembayaran" && (
        <Pembayaran
          onBack={handleBack}
          total={paymentData.total}
          paymentData={paymentData}
        />
      )}
    </>
  );
}
