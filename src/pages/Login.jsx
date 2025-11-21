import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setToggle }) {
  const navigation = useNavigate();
  const BASE_URL = "http://localhost:8000";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // fungsi login beneran
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigation("/menu");
      } else {
        setError(res.data.message || "Login gagal");
      }
    } catch (err) {
      setError("Email atau password salah");
      console.log(err);
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // onNavigate("menu", { user: "google_user" });
    navigation("/menu");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-100 py-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Login</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-12">

        {/* Logo */}
        <img
          src="/Gambar_Kopi.png"
          alt="Kopi Boedaja Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-6"
        />

        {/* Branding */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">KOPI BOEDAJA</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Selamat datang di kedai kopi boedaja
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="nama@gmail.com"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors text-sm sm:text-base"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-600 mt-4">
          Apabila belum memiliki akun bisa melakukan{" "}
          <button
            onClick={setToggle}
            className="text-red-500 font-bold hover:underline"
          >
            REGISTRASI
          </button>
        </p>

        {/* Divider */}
        {/* <div className="w-full max-w-sm flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-400 text-xs">atau</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div> */}

        {/* Google Button */}
        {/* <button
          onClick={handleGoogleLogin}
          className="w-full max-w-sm flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <text x="2" y="18" fontSize="14" fill="currentColor">
              G
            </text>
          </svg>
          Google
        </button> */}
      </div>
    </div>
  );
}
