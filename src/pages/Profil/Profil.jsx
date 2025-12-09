import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Coffee, CreditCard, LogOut, Phone, Mail } from "lucide-react";

export default function Profil({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    phone: user?.phone || '+62 812-3456-7890', // Mock data if not present
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    setLoading(true);
    const timer = setTimeout(() => {
      setUserData({
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        phone: user?.phone || '+62 812-3456-7890',
      });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [user]);

  const menuItems = [
    { label: "Profile", path: "/profil", icon: <User size={20} /> },
    { label: "Pesanan", path: "/menu", icon: <Coffee size={20} /> },
    { label: "Pembayaran", path: "/pembayaran", icon: <CreditCard size={20} /> },
  ];

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Profil Saya</h1>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 space-y-8">

        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-3xl font-bold border-4 border-white shadow-md">
              {userData.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 truncate">{userData.name}</h2>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail size={16} />
              <span className="truncate">{userData.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone size={16} />
              <span>{userData.phone}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <span className={`transition-transform duration-200 ${location.pathname === item.path ? "scale-110" : "group-hover:scale-110"
                }`}>
                {item.icon}
              </span>
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-red-600 font-medium py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>

      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      )}
    </div>
  );
}
