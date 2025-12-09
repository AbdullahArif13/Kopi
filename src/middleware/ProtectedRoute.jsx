import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
    const token = localStorage.getItem("token");

    let user = null;

    try {
        const raw = localStorage.getItem("user");
        user = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error("Invalid JSON in user storage. Resetting user.");
        localStorage.removeItem("user");
        user = null;
    }

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return (
            <Navigate
                to={user.role === "admin" ? "/manajemen-menu" : "/menu"}
                replace
            />
        );
    }

    return children;
}
