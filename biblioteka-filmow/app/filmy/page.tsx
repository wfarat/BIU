'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {useFetch} from "@/app/hooks/useFetch";
import {Film} from "@/types/film";

export default function FilmyPage() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const { data: films, loading, error } = useFetch<Film[]>('/api/filmy?v=' + refreshKey);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    const filteredFilms = films?.filter(film =>
        film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Lista Filmów</h1>

            <div>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Szukaj filmu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={handleRefresh}
                >
                    Odśwież
                </button>
            </div>

            {loading && <p>Ładowanie filmów...</p>}

            {error && <p>Błąd: {error}</p>}

            {!loading && !error && (
                <ul>
                    {filteredFilms && filteredFilms.length > 0 ? (
                        filteredFilms.map(film => (
                            <li key={film.id}>
                                <Link
                                    href={`/filmy/${film.id}`}
                                >
                                    {film.title}
                                </Link>
                                <span>({film.year})</span>
                            </li>
                        ))
                    ) : (
                        <p>Nie znaleziono filmów.</p>
                    )}
                </ul>
            )}

            <Link href="/filmy/dodaj">Dodaj Film</Link>
        </div>
    );
}
