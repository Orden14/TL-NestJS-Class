import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Échec de la connexion. Vérifiez vos identifiants.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            login(); // Met à jour le contexte
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Se connecter</h2>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Votre nom d'utilisateur"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Votre mot de passe"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Se connecter
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Pas encore de compte ?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
        </div>
    );
}
