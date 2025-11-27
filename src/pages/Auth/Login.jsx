"use client"

import { useNavigate } from "react-router-dom"
import useLogin from "./hooks/useLogin"

export default function Login({ setToggle }) {
  const navigate = useNavigate()
  const { formData, loading, error, handleInputChange, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login()

    if (res) {
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))
      navigate("/menu")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gray-100 py-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Login</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <img src="/Gamber_Kopi.png" alt="Kopi Boedaja Logo" className="w-24 h-24 mb-6" />

        <h2 className="text-2xl font-bold mb-2">KOPI BOEDAJA</h2>
        <p className="text-gray-600 text-sm mb-8">Selamat datang</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-red-500 text-white py-3 rounded-lg">
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Belum punya akun?
          <button onClick={setToggle} className="text-red-500 font-bold ml-1">
            REGISTRASI
          </button>
        </p>

        <button onClick={() => navigate("/manajemenMenu")} className="mt-4 w-full max-w-sm text-red-500 py-2">
          Login Admin
        </button>
      </div>
    </div>
  )
}
