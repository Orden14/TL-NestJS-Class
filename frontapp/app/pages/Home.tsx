import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { useMovies } from "~/hooks/useMovies";
import MovieCard from "~/components/MovieCard";
import BookingModal from "~/components/BookingModal";
import type {Movie} from "~/types/Movie";

export default function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const movies = useMovies(isAuthenticated, navigate);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [bookingDate, setBookingDate] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBook = async () => {
        if (!selectedMovie || !bookingDate) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    movieId: selectedMovie.id,
                    bookingDate: new Date(bookingDate),
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la réservation");
            }

            alert("Réservation réussie !");
            setIsModalOpen(false);
            navigate("/");
        } catch (error) {
            alert("Erreur lors de la réservation");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Liste des films</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onBook={(movie) => {
                            setSelectedMovie(movie);
                            setIsModalOpen(true);
                        }}
                    />
                ))}
            </div>

            {isModalOpen && selectedMovie && (
                <BookingModal
                    movieTitle={selectedMovie.original_title}
                    bookingDate={bookingDate}
                    setBookingDate={setBookingDate}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleBook}
                    today={today}
                />
            )}
        </div>
    );
}
