import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

export default function Registrasi({ setToggle }) {
  const navigation = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

   try {
  const BASE_URL = "http://localhost:8000";

  const res = await axios.post(`${BASE_URL}/registrasi`, {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
  });

  if (res.data.success) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigation("/menu");
  } else {
    setError(res.data.message || "Registrasi gagal");
  }
} catch (err) {
  setError(err.response?.data?.message || "Registrasi gagal. Coba lagi nanti");
  console.log(err);
}

setLoading(false);


  }

  const handleNavigateToLogin = () => {
    navigation("/")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-100 py-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Registrasi</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-12 overflow-y-auto">
        {/* Logo */}
        <img src="/Gambar_Kopi.png" alt="Kopi Boedaja Logo" className="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-6" />

        {/* Branding */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">KOPI BOEDAJA</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8">Selamat datang di kedai kopi boedaja</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tuliskan nama anda di sini"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Telephone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
            />
            <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
              ⚠️ Silahkan masukkan nomor telephone anda.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
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
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
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
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-600 mt-4">
          Apabila sudah memiliki akun maka bisa{" "}
          <button onClick={setToggle} className="text-red-500 font-bold hover:underline">
            LOGIN
          </button>
        </p>
      </div>
    </div>
  )
}
