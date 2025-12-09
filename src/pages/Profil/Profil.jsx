import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Coffee,
  CreditCard,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";

export default function Profil() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null); // <-- awalnya null
  const [loading, setLoading] = useState(true); // <-- skeleton aktif

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem("auth_user"));
      setUserData(savedUser || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { label: "Profile", path: "/profil", icon: <User size={20} /> },
    { label: "Pesanan", path: "/menu", icon: <Coffee size={20} /> },
    {
      label: "Pembayaran",
      path: "/pembayaran",
      icon: <CreditCard size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4 relative flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800">
          Profil
        </h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-8">
        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
          {/* Skeleton avatar */}
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-3xl font-bold border-4 border-white shadow-md">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-2">
            {/* Skeleton name */}
            {loading ? (
              <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <h2 className="text-2xl font-bold text-gray-900 truncate">
                {userData?.name}
              </h2>
            )}

            {/* Skeleton email */}
            {loading ? (
              <div className="w-52 h-4 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail size={16} />
                <span className="truncate">{userData?.email}</span>
              </div>
            )}

            {/* Skeleton phone */}
            {loading ? (
              <div className="w-36 h-4 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Phone size={16} />
                <span>{userData?.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              disabled={loading}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {item.icon}
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-white text-red-600 font-medium py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-[1px] z-40"></div>
      )}
    </div>
  );
}
