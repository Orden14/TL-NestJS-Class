import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout(); // Met à jour le contexte
        navigate("/login");
    }, [logout, navigate]);

    return null;
}
