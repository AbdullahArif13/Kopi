import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const AuthPage = lazy(() => import("../pages/Auth/AuthPage"));
const Login = lazy(() => import("../pages/Login"));
const Menu = lazy(() => import("../pages/Menu"));
const Pembayaran = lazy(() => import("../pages/Pembayaran"));
const RincianPesanan = lazy(() => import("../pages/RincianPesanan"));
const RincianPembayaran = lazy(() => import("../pages/RincianPembayaran"));
const Registrasi = lazy(() => import("../pages/Registrasi"));
const Profil = lazy(() => import("../pages/Profil"));

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
                <Route path="/login" element={<Login />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
                <Route path="/rincian-pesanan" element={<RincianPesanan />} />
                <Route path="/rincian-pembayaran" element={<RincianPembayaran />} />
                <Route path="/register" element={<Registrasi />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;