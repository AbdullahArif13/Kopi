"use client"

import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"

export default function Registrasi({ setToggle }) {
  const { formData, loading, error, handleInputChange, handleSubmit } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gray-100 py-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Registrasi</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <img src="/Gambar_Kopi.png" alt="Kopi Boedaja Logo" className="w-24 h-24 sm:w-32 sm:h-32 mb-6" />

        <h2 className="text-2xl sm:text-3xl font-bold mb-2">KOPI BOEDAJA</h2>
        <p className="text-gray-600 text-sm mb-8">Selamat datang di kedai kopi boedaja</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-2">Telephone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-red-500 text-white py-3 rounded-lg">
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Sudah punya akun?
          <button onClick={() => navigate("/")} className="text-red-500 font-bold ml-1">
            LOGIN
          </button>
        </p>
      </div>
    </div>
  )
}
