import { useState } from "react";
import { authService } from "../../service/authService";

export default function useAuth() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const login = async () => {
        setLoading(true);
        setError("");

        try {
            const user = await authService.login(formData.email, formData.password);

            return {
                success: true,
                user,
                token: "dummy-token-" + Date.now()
            };

        } catch (err) {
            setError(err.message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        handleInputChange,
        login
    };
}
