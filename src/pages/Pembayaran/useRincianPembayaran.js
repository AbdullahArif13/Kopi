import { useState } from "react";

export default function useRincianPembayaran() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    tableNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.fullName) return "Nama lengkap wajib diisi";
    if (!formData.phone) return "Nomor telepon wajib diisi";
    if (!formData.email) return "Email wajib diisi";
    if (!formData.tableNumber) return "Nomor meja wajib diisi";
    return null;
  };

  const handleContinue = (callback) => {
    const error = validate();
    if (error) return error;

    callback?.(formData);
    return null;
  };

  return {
    formData,
    handleInputChange,
    handleContinue,
  };
}
