import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useRegistrasi() {
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const BASE_URL = "http://localhost:8000/api";

      const res = await axios.post(`${BASE_URL}/registrasi`, formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigation("/menu");
      } else {
        setError(res.data.message || "Registrasi gagal");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal. Coba lagi nanti");
    }

    setLoading(false);
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
}
