import React from "react";
import type {Movie} from "~/types/Movie";

interface MovieCardProps {
    movie: Movie;
    onBook: (movie: Movie) => void;
}

export default function MovieCard({ movie, onBook }: Readonly<MovieCardProps>) {
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
                <p className="text-gray-600">Sortie : {movie.release_date}</p>
                <div className="flex items-center justify-center">
                    <button
                        className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-900"
                        onClick={() => onBook(movie)}
                    >
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    );
}
