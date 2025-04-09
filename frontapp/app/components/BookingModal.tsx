import React from "react";

interface BookingModalProps {
    movieTitle: string;
    bookingDate: string;
    setBookingDate: (date: string) => void;
    onClose: () => void;
    onConfirm: () => void;
    today: string;
}

export default function BookingModal({
    movieTitle,
    bookingDate,
    setBookingDate,
    onClose,
    onConfirm,
    today,
}: Readonly<BookingModalProps>) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Réserver : {movieTitle}</h2>
                <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">
                    Choisissez une date et une heure :
                </label>
                <input
                    type="datetime-local"
                    id="bookingDate"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-300"
                />
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    <button
                        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-800"
                        onClick={onConfirm}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
}
