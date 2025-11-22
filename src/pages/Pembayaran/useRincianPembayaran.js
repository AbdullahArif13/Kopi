import { useState } from "react";

export default function useRincianPembayaran(initialTotal = 0) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    tableNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = (onContinue) => {
    const { fullName, phone, email, tableNumber } = formData;
    if (fullName && phone && email && tableNumber) {
      onContinue && onContinue(formData);
    } else {
      alert("Mohon lengkapi semua data");
    }
  };

  return {
    formData,
    handleInputChange,
    handleContinue,
  };
}
