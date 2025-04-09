import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Bienvenue sur MovieBooker</h1>
        </div>
    );
}
