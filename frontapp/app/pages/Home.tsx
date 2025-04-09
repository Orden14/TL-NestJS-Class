import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

interface Movie {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
}
export default function Home() {
    const { isAuthenticated } = useAuth();
    const [movies, setMovies] = useState<Movie[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Erreur lors de la récupération des films");
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des films</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-gray-900 shadow-md rounded-lg overflow-hidden"
                        data-id={movie.id}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movie.backdrop_path}`}
                            alt={movie.original_title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4 bg-gray-900">
                            <h2 className="text-lg font-bold">{movie.original_title}</h2>
                            <p className="text-gray-600">Sortie : {movie.release_date}</p>
                            <div className="flex items-center justify-center">
                                <button
                                    className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-900"
                                    onClick={() => console.log(`Réserver le film ID: ${movie.id}`)}
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

