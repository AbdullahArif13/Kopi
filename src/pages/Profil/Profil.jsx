import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   // <-- WAJIB
import axios from 'axios';

export default function Profil({ onNavigate, user }) {
  const navigate = useNavigate();   // <-- HARUS DI LUAR useEffect

  const [userData, setUserData] = useState({
    name: user?.name || 'Masuk sebagai tamu',
    email: user?.email || '',
    orders: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const BASE_URL = "http://localhost:8000";

    console.log('[v0] Fetching user profile for:', user?.email);

    setLoading(true);

    setTimeout(() => {
      setUserData((prev) => ({
        ...prev,
        name: user?.name || 'User Profile',
      }));
      setLoading(false);
    }, 500);
  }, [user]);

  const handleMyOrders = () => {
    onNavigate('myOrders');
  };

  const handleLogout = () => {
    // Bisa pakai navigate langsung
    navigate('/');
    localStorage.removeItem("token"); 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-100 py-4 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Profil</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-8 sm:py-12">
        {/* User Info Section */}
        <div className="flex items-start gap-4 mb-8 max-w-2xl mx-auto w-full">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
              {userData.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">
              {userData.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 break-all">
              {userData.email}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 max-w-2xl mx-auto w-full">
          {/* My Orders */}
          <button
            onClick={handleMyOrders}
            className="w-full flex items-center gap-4 border-2 border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
          >
            <svg className="w-6 h-6 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-semibold text-gray-800">Pesanan saya</span>
          </button>

          {/* Settings Placeholder 1 */}
          <button
            onClick={() => {
              // TODO: Add settings/preferences page
              console.log('[v0] Settings clicked');
            }}
            className="w-full border-2 border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-gray-600">Menu Tambahan 1</span>
          </button>

          {/* Settings Placeholder 2 */}
          <button
            onClick={() => {
              // TODO: Add another menu option
              console.log('[v0] Menu option 2 clicked');
            }}
            className="w-full border-2 border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
          >
            <span className="text-gray-600">Menu Tambahan 2</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 max-w-2xl mx-auto w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
}
