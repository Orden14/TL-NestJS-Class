import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import BookingCard from "~/components/BookingCard";

interface Booking {
    id: number;
    bookingDate: Date;
    movie: {
        id: number;
        original_title: string;
        release_date: string;
        backdrop_path: string;
    };
}

export default function MyBookings() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des réservations.");
                }

                const data: Booking[] = await response.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Mes Réservations</h1>
            {bookings.length === 0 ? (
                <p>Vous n'avez aucune réservation pour le moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {bookings.map((booking) => (
                        <BookingCard key={booking.id} date={booking.bookingDate} movie={booking.movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
