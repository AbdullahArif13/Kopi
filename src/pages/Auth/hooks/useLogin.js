import { useState } from "react";
import axios from "axios";

export default function useLogin() {
  const BASE_URL = "http://localhost:8000/api";

  const [formData, setFormData] = useState({
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

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);

      if (!res.data.success) {
        setError(res.data.message || "Login gagal");
        return null;
      }

      return res.data;

    } catch (err) {
      setError("Email atau password salah");
      return null;

    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    login,
  };
}
