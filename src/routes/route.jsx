import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

const AuthPage = lazy(() => import("../pages/Auth/AuthPage"));
const Menu = lazy(() => import("../pages/menu/MenuPage"));
const Pembayaran = lazy(() => import("../Pages/Pembayaran/PembayaranPage"));
const Profil = lazy(() => import("../pages/Profil/Profil"));
const ManajemenMenu = lazy(() => import("../pages/Admin/ManajemenMenu"));
const ManajemnPesanan = lazy(() => import("../pages/Admin/ManajemenPesanan"));

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
                <Route path="/menu" element={<Menu />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/manajemenMenu" element={<ManajemenMenu />} />
                <Route path="/manajemenPesanan" element={<ManajemnPesanan />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;