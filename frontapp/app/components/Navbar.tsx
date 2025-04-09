import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-2xl font-bold">
                    MonSite
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">
                        Accueil
                    </Link>
                    <Link to="/login" className="hover:text-gray-300">
                        Connexion
                    </Link>
                    <Link to="/register" className="hover:text-gray-300">
                        Inscription
                    </Link>
                    <Link to="/logout" className="hover:text-gray-300">
                        Déconnexion
                    </Link>
                </div>
            </div>
        </nav>
    );
}
