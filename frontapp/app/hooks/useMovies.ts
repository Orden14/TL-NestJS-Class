import { useEffect, useState } from "react";

interface Movie {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
}

export function useMovies(isAuthenticated: boolean, navigate: (path: string) => void) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des films");
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [isAuthenticated, navigate]);

    return movies;
}
