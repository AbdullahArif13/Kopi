import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../middleware/ProtectedRoute";

const Register = lazy(() => import("../pages/Auth/Registrasi"));
const AuthPage = lazy(() => import("../pages/Auth/AuthPage"));
const Menu = lazy(() => import("../pages/menu/MenuPage"));
const Pembayaran = lazy(() => import("../pages/Pembayaran/PembayaranPage"));
const Profil = lazy(() => import("../pages/Profil/Profil"));
const ManajemenMenuPage = lazy(() => import("../pages/Admin/ManajemenMenuPage"));
const ManajemenPesananPage = lazy(() => import("../pages/Admin/ManajemenPesananPage"));
const AddMenu = lazy(() => import("../pages/Admin/AddMenuPage"));
const RiwayatPesanan = lazy(() => import("../pages/Admin/RiwayatPesananPage"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>

        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/menu"
          element={
            <ProtectedRoute requiredRole="customer">
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembayaran"
          element={
            <ProtectedRoute requiredRole="customer">
              <Pembayaran />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profil"
          element={
            <ProtectedRoute requiredRole="customer">
              <Profil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manajemen-menu"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManajemenMenuPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manajemen-pesanan"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManajemenPesananPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-menu"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riwayat-pesanan"
          element={
            <ProtectedRoute requiredRole="admin">
              <RiwayatPesanan />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
