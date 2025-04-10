import React from "react";
import type { Movie } from "~/types/Movie";

interface BookingCardProps {
    movie: Movie;
    date: Date;
    onCancel: (id: number) => void;
    bookingId: number;
}

export default function BookingCard({ date, movie, onCancel, bookingId }: Readonly<BookingCardProps>) {
    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));

    const handleCancel = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'annulation de la réservation.");
            }

            onCancel(bookingId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
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
                <p className="text-gray-600">Date de réservation : Le {formattedDate}</p>
                <div className="flex items-center justify-center">
                    <button
                        className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-900"
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
